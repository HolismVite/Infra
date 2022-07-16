import React, { useState, useEffect, useContext } from 'react'
import Collapse from '@mui/material/Collapse'
import { useSearchParams } from 'react-router-dom'
import app from 'App'
import { useLocalStorageState } from 'Hooks'
import { useList } from 'Hooks'
import Filtering from "./Filtering"
import Sorting from "./Sorting"
import Entities from "./Entities"
import ListActions from "./ListActions/ListActions"
import { TopContext } from 'Contexts'
import { ListContext } from 'Contexts'
import ShowHideTopPagination from './ShowHideTopPagination'
import ShowHideFiltering from './ShowHideFiltering'
import Reload from './Reload'
import ShowHideEntityActions from './ShowHideEntityActions'

const List = ({
  breadcrumbItems,
  card,
  classProvider,
  create,
  dialogs,
  edit,
  entityActions,
  entityType,
  expanded,
  filters,
  hasDelete,
  hasEdit,
  headers,
  isTree,
  listActions,
  menuForActions,
  multicolumn,
  row,
  separateRowForActions,
  show,
  sorts,
  subtitle,
  title,
  upsert,
  upsertionIcon,
  upsertionText,
}) => {

  const listActionIconStyle = "text-gray-700 hover:text-blue-500 cursor-pointer"
  const [isFilteringOpen, setIsFilteringOpen] = useLocalStorageState(false, `${app.camelize(entityType)}_isFilteringOpen`)
  const [hiddenEntityActions, setHiddenEntityActions] = useLocalStorageState(false, `${app.camelize(entityType)}_isEntityActionsHidden`)
  const [showTopPagiation, setTopPaginationVisibility] = useLocalStorageState(false, `${app.camelize(entityType)}_isTopPaginationShown`)

  const hasItemSelection = listActions ? true : false
  const { setTitle, setSubtitle, setBreadcrumbItems } = useContext(TopContext)
  let [searchParams] = useSearchParams();
  const [dialogProps, setDialogProps] = useState({})

  const {
    data,
    deselectEntities,
    deselectEntity,
    hasData,
    hasGuid,
    hasKey,
    hasOrder,
    hasSlug,
    loading,
    metadata,
    reload,
    reloadEntity,
    resetFilters,
    selectedEntities,
    selectEntities,
    selectEntity,
    setEntity,
    setEntityProgress,
    setFilter,
    setPageNumber,
    setPageSize,
    setSorts,
    usedFilters,
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
    edit,
    entityActions,
    entityType,
    expanded: expanded || true,
    filters,
    hasData,
    hasDelete,
    hasEdit,
    hasGuid,
    hasItemSelection,
    hasKey,
    hasOrder,
    hasSlug,
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
    resetFilters,
    row,
    selectedEntities,
    selectEntities,
    selectEntity,
    separateRowForActions,
    setDialogProps,
    setEntity,
    setEntityProgress,
    setFilter,
    setHiddenEntityActions,
    setIsFilteringOpen,
    setPageNumber,
    setPageSize,
    setSorts,
    setTopPaginationVisibility,
    show,
    showTopPagiation,
    upsert,
    upsertionIcon,
    upsertionText,
    usedFilters,
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

export default List

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
      ...
    Pagination
      GoToPage
      PageLinks
      PageSize
  Entities (tabular, card, tree)
    Entity1
      EntityActions
        EntityAction1
        EntityAction2
        ...
    Entity2
    ..
*/