import React, { useState, useEffect, useContext } from 'react'
import Switch from '@mui/material/Switch';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz'
import FilterListIcon from '@mui/icons-material/FilterList'
import CachedIcon from '@mui/icons-material/Cached'
import Collapse from '@mui/material/Collapse'
import Tooltip from '@mui/material/Tooltip'
import Filtering from "./Filtering"
import Sorting from "./Sorting"
import Entities from "./Entities"
import ListActions from "./ListActions/ListActions"
import app from '../../Base/App'
import useLocalStorageState from '../../Base/UseLocalStorageState'
import { DialogForm } from '../Form/DialogForm'
import { TopContext, HolismIcon } from '../../Panel/Panel'
import { ListContext } from './Contexts'
import useListParameters from '../../Hooks/useListParameters';
import Unify from '../Unify';

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
  creationButton,
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
    hasEdit
  }} id='list'>

    <div
      className={
        ' lg:flex items-center justify-between px-6 py-2 lg:h-14 '
      }
    >
      <ListActions
        actions={listActions}
        create={create}
        upsert={upsert}
        creationButton={creationButton}
      />
      <div
        className={
          " sortAndFilteringAndReload flex items-center justify-end gap-2 lg:my-0 "
        }
      >
        {
          !isTree && hasData && <span
            id='showHideTopPagination'
            className={
              listActionIconStyle
            }
            onClick={() => setTopPaginationVisibility(!showTopPagiation)}
          >
            <Tooltip title={app.t(showTopPagiation ? 'Hide top pagination' : 'Show top pagination')}>
              <SwapHorizIcon />
            </Tooltip>
          </span>
        }
        {
          sorts
            ?
            <Sorting sorts={sorts} />
            :
            null
        }
        {
          filters && (filters.props?.children?.length > 0 || filters.props?.children?.props)
            ?
            <span
              id='showHideFiltering'
              className={
                listActionIconStyle
              }
              onClick={() => setIsFilteringOpen(!isFilteringOpen)}
            >
              <Tooltip title={app.t('Filters')}>
                <FilterListIcon />
              </Tooltip>
              {/* <span>Filters</span> */}
            </span>
            :
            null
        }
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