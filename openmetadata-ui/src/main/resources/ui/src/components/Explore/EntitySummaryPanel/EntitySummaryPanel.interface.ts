/*
 *  Copyright 2022 Collate
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

import { Table, TableType } from '../../../generated/entity/data/table';
import { OverallTableSummeryType } from '../../TableProfiler/TableProfiler.interface';

export interface EntitySummaryPanelProps {
  entityDetails: Table;
  handleClosePanel: () => void;
  overallSummery: OverallTableSummeryType[];
  showPanel: boolean;
}

export interface BasicTableInfo {
  Type: TableType | string;
  Queries: string;
  Columns: string;
}
