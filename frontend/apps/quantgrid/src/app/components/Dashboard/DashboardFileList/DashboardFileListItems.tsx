import { Dropdown } from 'antd';
import { useContext, useMemo } from 'react';

import { DashboardContext } from '../../../context';
import { useDashboardCreateMenuItems } from '../hooks';
import { EmptySearchResults } from './EmptySearchResults';
import { FileListItem } from './FileListItem';

export function DashboardFileListItems() {
  const { displayedDashboardItems, loadingDashboard } =
    useContext(DashboardContext);

  const showNotFoundNotification = useMemo(
    () => !loadingDashboard && displayedDashboardItems.length === 0,
    [displayedDashboardItems.length, loadingDashboard]
  );
  const { dropdownItems } = useDashboardCreateMenuItems();

  return (
    <>
      {displayedDashboardItems.map((item) => (
        <FileListItem
          item={item}
          key={`${item.bucket}${item.parentPath ? item.parentPath : ''}${
            item.name
          }`}
        />
      ))}
      <Dropdown menu={{ items: dropdownItems }} trigger={['contextMenu']}>
        <div className="flex flex-col grow">
          {showNotFoundNotification && <EmptySearchResults />}
        </div>
      </Dropdown>
    </>
  );
}
