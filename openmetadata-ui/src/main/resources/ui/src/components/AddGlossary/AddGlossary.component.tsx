import classNames from 'classnames';
import { cloneDeep } from 'lodash';
import { EditorContentRef, FormatedUsersData } from 'Models';
import React, { useRef, useState } from 'react';
import { PageLayoutType } from '../../enums/layout.enum';
import { CreateGlossary } from '../../generated/api/data/createGlossary';
import UserCard from '../../pages/teams/UserCard';
import {
  errorMsg,
  getCurrentUserId,
  requiredField,
} from '../../utils/CommonUtils';
import { Button } from '../buttons/Button/Button';
import MarkdownWithPreview from '../common/editor/MarkdownWithPreview';
import PageLayout from '../containers/PageLayout';
import Loader from '../Loader/Loader';
import ReviewerModal from '../Modals/ReviewerModal/ReviewerModal.component';
import { AddGlossaryProps } from './AddGlossary.interface';

const Field = ({ children }: { children: React.ReactNode }) => {
  return <div className="tw-mt-4">{children}</div>;
};

const AddGlossary = ({
  header,
  allowAccess = true,
  saveState = 'initial',
  onCancel,
  onSave,
}: AddGlossaryProps) => {
  const markdownRef = useRef<EditorContentRef>();

  const [showErrorMsg, setShowErrorMsg] = useState<{ [key: string]: boolean }>({
    name: false,
  });

  const [name, setName] = useState('');
  const [description] = useState<string>('');
  const [showRevieweModal, setShowRevieweModal] = useState(false);
  const [reviewer, setReviewer] = useState<Array<FormatedUsersData>>([]);

  const onReviewerModalCancel = () => {
    setShowRevieweModal(false);
  };

  const handleReviewerSave = (reviewer: Array<FormatedUsersData>) => {
    setReviewer(reviewer);
    onReviewerModalCancel();
  };

  const handleValidation = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (!allowAccess) {
      return;
    }
    const value = event.target.value;
    const eleName = event.target.name;
    let { name } = cloneDeep(showErrorMsg);

    switch (eleName) {
      case 'name': {
        setName(value);
        name = false;

        break;
      }
    }
    setShowErrorMsg((prev) => {
      return { ...prev, name };
    });
  };

  const handleOptionRemove = (id: string) => {
    setReviewer((pre) => pre.filter((option) => option.id !== id));
  };

  const validateForm = () => {
    const errMsg = {
      name: !name.trim(),
    };
    setShowErrorMsg(errMsg);

    return !Object.values(errMsg).includes(true);
  };

  const handleSave = () => {
    if (validateForm()) {
      const data: CreateGlossary = {
        name,
        displayName: name,
        description: markdownRef.current?.getEditorContent() || undefined,
        reviewers: reviewer.map((d) => ({ id: d.id, type: d.type })),
        owner: {
          id: getCurrentUserId(),
          type: 'user',
        },
      };

      onSave(data);
    }
  };

  const getSaveButton = () => {
    return allowAccess ? (
      <>
        {saveState === 'waiting' ? (
          <Button
            disabled
            className="tw-w-16 tw-h-10 disabled:tw-opacity-100"
            size="regular"
            theme="primary"
            variant="contained">
            <Loader size="small" type="white" />
          </Button>
        ) : saveState === 'success' ? (
          <Button
            disabled
            className="tw-w-16 tw-h-10 disabled:tw-opacity-100"
            size="regular"
            theme="primary"
            variant="contained">
            <i aria-hidden="true" className="fa fa-check" />
          </Button>
        ) : (
          <Button
            className={classNames('tw-w-16 tw-h-10', {
              'tw-opacity-40': !allowAccess,
            })}
            data-testid="save-webhook"
            size="regular"
            theme="primary"
            variant="contained"
            onClick={handleSave}>
            Save
          </Button>
        )}
      </>
    ) : null;
  };

  const fetchRightPanel = () => {
    return (
      <>
        <h6 className="tw-heading tw-text-base">Configure Your Glossary</h6>
        <div className="tw-mb-5">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
          <br />
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </div>
        {/* {getDocButton('Read Webhook Doc', '', 'webhook-doc')} */}
      </>
    );
  };

  return (
    <PageLayout
      classes="tw-max-w-full-hd tw-h-full tw-bg-white tw-pt-4"
      layout={PageLayoutType['2ColRTL']}
      rightPanel={fetchRightPanel()}>
      <h6 className="tw-heading tw-text-base">{header}</h6>
      <div className="tw-pb-3">
        <Field>
          <label className="tw-block tw-form-label" htmlFor="name">
            {requiredField('Name:')}
          </label>

          <input
            className="tw-form-inputs tw-px-3 tw-py-1"
            data-testid="name"
            id="name"
            name="name"
            placeholder="Name"
            type="text"
            value={name}
            onChange={handleValidation}
          />

          {showErrorMsg.name && errorMsg('Glossary name is required.')}
        </Field>
        <Field>
          <label
            className="tw-block tw-form-label tw-mb-0"
            htmlFor="description">
            Description:
          </label>
          <MarkdownWithPreview
            data-testid="description"
            readonly={!allowAccess}
            ref={markdownRef}
            value={description}
          />
        </Field>

        <div>
          <div className="tw-flex tw-items-center tw-mt-4">
            <p className="w-form-label tw-mr-3">Reviewers: </p>
            <Button
              className="tw-h-5 tw-px-2"
              size="x-small"
              theme="primary"
              variant="contained"
              onClick={() => setShowRevieweModal(true)}>
              <i aria-hidden="true" className="fa fa-plus" />
            </Button>
          </div>
          <div className="tw-my-4 tw-grid tw-grid-cols-2 tw-gap-4">
            {Boolean(reviewer.length) &&
              reviewer.map((d) => {
                return (
                  <UserCard
                    isActionVisible
                    isIconVisible
                    item={{
                      name: d.name,
                      description: d.displayName,
                      id: d.id,
                    }}
                    key={d.id}
                    onRemove={handleOptionRemove}
                  />
                );
              })}
          </div>
        </div>

        <div className="tw-flex tw-justify-end">
          <Button
            data-testid="cancel-glossary"
            size="regular"
            theme="primary"
            variant="text"
            onClick={onCancel}>
            Discard
          </Button>
          {getSaveButton()}
        </div>
      </div>

      {showRevieweModal && (
        <ReviewerModal
          header="Add Reviewer"
          reviewer={reviewer}
          onCancel={onReviewerModalCancel}
          onSave={handleReviewerSave}
        />
      )}
    </PageLayout>
  );
};

export default AddGlossary;
