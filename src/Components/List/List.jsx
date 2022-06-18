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
import useListParameters from '../../Hooks/useListParameters';
import Unify from '../Unify';
import { useSearchParams } from 'react-router-dom'
import ShowHideTopPagination from './ShowHideTopPagination'
import ShowHideFiltering from './ShowHideFiltering'
import Reload from './Reload'
import ShowHideEntityActions from './ShowHideEntityActions'

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
  const listParameters = useListParameters(app.userGuid(), entityType)
  const [hasData, setHasData] = useState(false)
  const [isFilteringOpen, setIsFilteringOpen] = useLocalStorageState(false, `${app.userGuid()}_${entityType}_isFilteringOpen`)
  const [selectedEntities, setSelectedEntities] = useState([])
  const [hiddenEntityActions, setHiddenEntityActions] = useLocalStorageState(false, `${app.userGuid()}_${entityType}_isEntityActionsHidden`)
  const [showTopPagiation, setTopPaginationVisibility] = useLocalStorageState(false, `${app.userGuid()}_${entityType}_isTopPaginationShown`)

  const hasItemSelection = listActions ? true : false
  const { setTitle, setSubtitle, setBreadcrumbItems } = useContext(TopContext)
  let [searchParams] = useSearchParams();
  const [dialogProps, setDialogProps] = useState({})
  const [isDialogOpen, setIsDialogOpen] = useState(searchParams.get("showDialog") || false);

  const showDialog = ({ entity, purpose, ...props }) => {
    setDialogProps({
      purpose,
      entity,
      ...props
    })
    setIsDialogOpen(true)
  }

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
    create,
    dialogProps,
    entityType,
    filters,
    hasData,
    hasDelete,
    hasEdit,
    hasItemSelection,
    headers,
    hiddenEntityActions,
    isDialogOpen,
    isFilteringOpen,
    isTree,
    listActionIconStyle,
    listActions,
    listParameters,
    menuForActions,
    row,
    selectedEntities,
    setDialogProps,
    setHasData,
    setHiddenEntityActions,
    setIsDialogOpen,
    setIsFilteringOpen,
    setSelectedEntities,
    setTopPaginationVisibility,
    setTopPaginationVisibility,
    showDialog,
    showTopPagiation,
    showTopPagiation,
    upsert,
    upsertionIcon,
    upsertionText,
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