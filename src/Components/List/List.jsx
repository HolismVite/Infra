import React, { useState, useEffect, useContext } from 'react'
import Switch from '@mui/material/Switch';
import CachedIcon from '@mui/icons-material/Cached'
import Collapse from '@mui/material/Collapse'
import Tooltip from '@mui/material/Tooltip'
import Filtering from "./Filtering"
import Sorting from "./Sorting"
import Entities from "./Entities"
import ListActions from "./ListActions/ListActions"
import app from '../../Base/App'
import useLocalStorageState from '../../Base/UseLocalStorageState'
import { TopContext } from '../../Panel/Panel'
import { ListContext } from './Contexts'
import useListParameters from '../../Hooks/useListParameters';
import Unify from '../Unify';
import { useSearchParams } from 'react-router-dom'
import ShowHideTopPagination from './ShowHideTopPagination'
import ShowHideFiltering from './ShowHideFiltering'

const listActionIconStyle = "text-gray-700 hover:text-blue-500 cursor-pointer"

const List = ({
  title,
  subtitle,
  breadcrumbItems,
  filters,
  listActions,
  sorts,
  entityType,
  headers,
  row,
  card,
  multicolumn,
  create,
  entityActions,
  separateRowForActions,
  menuForActions,
  hasDelete,
  hasEdit,
  edit,
  upsertionIcon,
  upsertionText,
  classProvider,
  upsert,
  dialogs,
  isTree,
  expanded,
  show
}) => {
  const listParameters = useListParameters(app.userGuid(), entityType)
  const [hasData, setHasData] = useState(false)
  const [isFilteringOpen, setIsFilteringOpen] = useLocalStorageState(false, `${app.userGuid()}_${entityType}_isFilteringOpen`)
  const [selectedEntities, setSelectedEntities] = useState([])
  const [hiddenEntityActions, setHiddenEntityActions] = useLocalStorageState(false, `${app.userGuid()}_${entityType}_isEntityActionsHidden`)
  const [showTopPagiation, setTopPaginationVisibility] = useLocalStorageState(false, `${app.userGuid()}_${entityType}_isTopPaginationShown`)

  const hasItemSelection = listActions ? true : false
  const { setTitle, setSubtitle, setBreadcrumbItems } = useContext(TopContext)
  let [searchParams] = useSearchParams();

  const [isDialogFormOpen, setIsDialogFormOpen] = useState(searchParams.get("showDialog") || false);

  useEffect(() => {
    // console.log(selectedEntities)
  }, [selectedEntities])

  useEffect(() => {
    setTitle(title)
    setSubtitle(subtitle)
    setBreadcrumbItems(breadcrumbItems)
  }, [title, subtitle, breadcrumbItems])

  return <ListContext.Provider value={{
    listParameters,
    selectedEntities,
    setSelectedEntities,
    hasData,
    setHasData,
    hasItemSelection,
    showTopPagiation,
    setTopPaginationVisibility,
    entityType,
    headers,
    row,
    card,
    menuForActions,
    hasDelete,
    hasEdit,
    create,
    upsert,
    upsertionIcon,
    upsertionText,
    listActions,
    showTopPagiation,
    setTopPaginationVisibility,
    isTree,
    isFilteringOpen,
    setIsFilteringOpen,
    filters,
  }}>

    <div
      id='list'
      className={
        ' lg:flex items-center justify-between px-6 py-2 lg:h-14 '
      }
    >
      <ListActions />
      <div
        className={
          " sortAndFilteringAndReload flex items-center justify-end gap-2 lg:my-0 "
        }
      >
        <ShowHideTopPagination
          className={listActionIconStyle}
        />
        <Sorting
          className={listActionIconStyle}
          sorts={sorts}
        />
        <ShowHideFiltering
          className={listActionIconStyle}
        />
        {
          <span
            id='reload'
            onClick={() => app.emit(app.reloadRequested)}
            className={
              listActionIconStyle
            }
          >
            <Tooltip title={app.t('Reload')}>
              <CachedIcon />
            </Tooltip>
          </span>
        }
        {
          !menuForActions && hasData && (entityActions || hasDelete || hasEdit || edit) &&
          <Tooltip title={hiddenEntityActions ? app.t('Show actions') : app.t('Hide actions')}>
            <Switch
              size="small"
              checked={!hiddenEntityActions}
              onChange={(e) => setHiddenEntityActions(!hiddenEntityActions)}
            />
          </Tooltip>
        }
      </div>
    </div>

    <Collapse in={isFilteringOpen}>
      <div className='mb-2'>
        <Filtering filters={filters} />
      </div>
    </Collapse>

    <Entities
      create={create}
      multicolumn={multicolumn}
      entityActions={entityActions}
      separateRowForActions={separateRowForActions}
      edit={edit}
      classProvider={classProvider}
      upsert={upsert}
      isTree={isTree}
      expanded={expanded}
      show={show}
      hiddenEntityActions={hiddenEntityActions}
    />
    {
      create && typeof create !== 'string'
      &&
      <Unify
        component={create}
      />
    }
    {
      upsert && typeof upsert !== 'string'
      &&
      <Unify
        component={upsert}
      />
    }
    {
      edit && typeof edit !== 'string'
      &&
      <Unify
        component={edit}
      />
    }
  </ListContext.Provider>
}

export { List }

/*
List anatomy

  List
    ListActions
      ListAction
      ListAction
      ...
    Filtering
      Filter1
      Filter2
      ...
    Sorting
      Sort1
      Sort2
    Pagination
      GoToPage
      PageSize
      Page links
  Items (tabular, card)
    Item1
      EntityActions
        EntityAction1
        EntityAction2
        ...
    Item2
    ..
*/