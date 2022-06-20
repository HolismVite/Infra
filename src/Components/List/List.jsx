import React, { useState, useEffect, useContext } from 'react'
import Collapse from '@mui/material/Collapse'
import Filtering from "./Filtering"
import Sorting from "./Sorting"
import Entities from "./Entities"
import ListActions from "./ListActions/ListActions"
import app from '../../Base/App'
import useLocalStorageState from '../../Base/UseLocalStorageState'
import { TopContext } from '../../Panel/Panel'
import { ListContext } from './Contexts'
import { useSearchParams } from 'react-router-dom'
import ShowHideTopPagination from './ShowHideTopPagination'
import ShowHideFiltering from './ShowHideFiltering'
import Reload from './Reload'
import ShowHideEntityActions from './ShowHideEntityActions'
import useList from '../../Hooks/useList'

const List = ({
  entityType,
  title,
  subtitle,
  breadcrumbItems,
  create,
  listActions,
  filters,
  sorts,
  headers,
  row,
  separateRowForActions,
  card,
  entityActions,
  menuForActions,
  multicolumn,
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

  const listActionIconStyle = "text-gray-700 hover:text-blue-500 cursor-pointer"
  const [isFilteringOpen, setIsFilteringOpen] = useLocalStorageState(false, `${app.userGuid()}_${entityType}_isFilteringOpen`)
  const [hiddenEntityActions, setHiddenEntityActions] = useLocalStorageState(false, `${app.userGuid()}_${entityType}_isEntityActionsHidden`)
  const [showTopPagiation, setTopPaginationVisibility] = useLocalStorageState(false, `${app.userGuid()}_${entityType}_isTopPaginationShown`)

  const hasItemSelection = listActions ? true : false
  const { setTitle, setSubtitle, setBreadcrumbItems } = useContext(TopContext)
  let [searchParams] = useSearchParams();
  const [dialogProps, setDialogProps] = useState({})

  const {
    data,
    deselectEntities,
    deselectEntity,
    hasData,
    loading,
    metadata,
    reload,
    reloadEntity,
    selectEntities,
    selectEntity,
    selectedEntities,
    setEntity,
    setEntityProgress,
    addFilter,
    setPageSize,
    setPageNumber,
    resetFilters,
  } = useList({
    entityType,
    isTree
  })

  useEffect(() => {
    // console.log(selectedEntities)
  }, [selectedEntities])

  useEffect(() => {
    setTitle(title)
    setSubtitle(subtitle)
    setBreadcrumbItems(breadcrumbItems)
  }, [title, subtitle, breadcrumbItems])

  return <ListContext.Provider value={{
    card,
    classProvider,
    create,
    data,
    deselectEntities,
    deselectEntity,
    dialogProps,
    entityActions,
    entityType,
    filters,
    hasData,
    hasDelete,
    hasEdit,
    hasItemSelection,
    headers,
    hiddenEntityActions,
    isFilteringOpen,
    isTree,
    listActionIconStyle,
    listActions,
    loading,
    menuForActions,
    metadata,
    multicolumn,
    reload,
    reloadEntity,
    row,
    selectEntities,
    selectEntity,
    selectedEntities,
    separateRowForActions,
    setDialogProps,
    setEntity,
    setEntityProgress,
    setHiddenEntityActions,
    setIsFilteringOpen,
    setTopPaginationVisibility,
    showTopPagiation,
    upsert,
    upsertionIcon,
    upsertionText,
    addFilter,
    setPageSize,
    setPageNumber,
    resetFilters,
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
          " flex items-center justify-end gap-2 lg:my-0 "
        }
      >
        <ShowHideTopPagination />
        <Sorting sorts={sorts} />
        <ShowHideFiltering />
        <Reload />
        <ShowHideEntityActions />
      </div>
    </div>

    <Collapse in={isFilteringOpen}>
      <div className='mb-2'>
        <Filtering filters={filters} />
      </div>
    </Collapse>

    <Entities />

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