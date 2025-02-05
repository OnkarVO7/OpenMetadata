import { TabSpecificField } from '../enums/entity.enum';
import { SearchIndex } from '../enums/search.enum';
import { DatabaseSchema } from '../generated/entity/data/databaseSchema';
import { EntityReference } from '../generated/type/entityReference';
import {
  SearchResponse,
  TableSearchSource,
} from '../interface/search.interface';

export const databaseSchemaDetailsTabs = [
  {
    name: 'Tables',
    path: 'tables',
  },
  {
    name: 'Activity Feeds',
    path: 'activity_feed',
    field: TabSpecificField.ACTIVITY_FEED,
  },
];

export const getCurrentDatabaseSchemaDetailsTab = (tab: string) => {
  let currentTab = 1;
  switch (tab) {
    case 'activity_feed':
      currentTab = 2;

      break;

    case 'tables':
    default:
      currentTab = 1;

      break;
  }

  return currentTab;
};

export const getTablesFromSearchResponse = (
  res: SearchResponse<SearchIndex.TABLE, keyof TableSearchSource>
) => res.hits.hits.map((hit) => hit._source);

export const getQueryStringForSchemaTables = (
  serviceName: EntityReference,
  databaseName: EntityReference,
  schemaName: DatabaseSchema
) =>
  `(service.name:${serviceName.name}) AND (database.name:${databaseName.name}) AND (databaseSchema.name:${schemaName.name})`;
