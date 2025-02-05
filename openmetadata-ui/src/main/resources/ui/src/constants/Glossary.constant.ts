/*
 *  Copyright 2021 Collate
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *  http://www.apache.org/licenses/LICENSE-2.0
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import { t } from 'i18next';
import { AddGlossaryError } from '../components/AddGlossary/AddGlossary.interface';
import { errorMsg } from '../utils/CommonUtils';

export const ADD_GLOSSARY_ERROR = {
  [AddGlossaryError.NAME_REQUIRED]: errorMsg(
    t('label.field-required', {
      field: `${t('label.glossary')} ${t('label.name-lowercase')}`,
    }) + '.'
  ),
  [AddGlossaryError.NAME_INVALID]: errorMsg(
    t('label.field-invalid', {
      field: `${t('label.glossary')} ${t('label.name-lowercase')}`,
    }) + '.'
  ),
  [AddGlossaryError.DESCRIPTION_REQUIRED]: errorMsg(
    t('label.field-required', {
      field: t('label.description'),
    }) + '.'
  ),
};
