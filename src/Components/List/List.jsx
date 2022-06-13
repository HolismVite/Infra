import React, { useState, useEffect, useContext } from 'react'
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz'
import FilterListIcon from '@mui/icons-material/FilterList'
import CachedIcon from '@mui/icons-material/Cached'
import Collapse from '@mui/material/Collapse'
import Tooltip from '@mui/material/Tooltip'
import Filtering from "./Filtering"
import CreateListParameters from "../../Base/CreateListParameters"
import Sorting from "./Sorting"
import Items from "./Entities"
import ListActions from "./ListActions/ListActions"
import app from '../../Base/App'
import useLocalStorageState from '../../Base/UseLocalStorageState'
import { DialogForm } from '../Form/DialogForm'
import { TopContext, HolismIcon } from '../../Panel/Panel'
import { ListContext } from './Contexts'

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
  const [listParameters] = useState(CreateListParameters(app.userGuid(), entityType))
  const [hasData, setHasData] = useState(false)
  const [isFilteringOpen, setIsFilteringOpen] = useLocalStorageState(false, `${app.userGuid()}_${entityType}_isFilteringOpen`)
  const [selectedItems, setSelectedItems] = useState([])
  const [hiddenEntityActions, setHiddenEntityActions] = useLocalStorageState(false, `${app.userGuid()}_${entityType}_isEntityActionsHidden`)

  const hasItemSelection = listActions ? true : false
  const CreationComponent = (create ? (typeof create === 'function' ? create() : create) : null)
  const EditionComponent = (edit ? (typeof edit === 'function' ? edit() : create) : null)
  const UpsertComponent = (upsert ? (typeof upsert === 'function' ? upsert() : create) : null)
  const { setTitle, setSubtitle, setBreadcrumbItems } = useContext(TopContext)

  useEffect(() => {
    // console.log(selectedItems)
  }, [selectedItems])

  useEffect(() => {
    setTitle(title)
    setSubtitle(subtitle)
    setBreadcrumbItems(breadcrumbItems)
  }, [title, subtitle, breadcrumbItems])

  const toggleFiltering = () => {
    setIsFilteringOpen(!isFilteringOpen)
  }

  return <ListContext.Provider value={{
    listParameters: listParameters,
    selectedItems: selectedItems,
    setSelectedItems: setSelectedItems,
    hasData: hasData,
    setHasData: setHasData
  }} id='list'>

    <div
      className={
        'lg:flex items-center justify-between px-6 py-2 lg:h-14'
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
          "sortAndFilteringAndReload flex items-center justify-end my-4 lg:my-0"
        }
      >
        {
          !isTree && hasData && <span
            id='showHideTopPagination'
            className={
              listActionIconStyle
              + " ltr:ml-2 mr-2 "
            }
            onClick={() => app.emit(app.toggleTopPagination)}
          >
            <SwapHorizIcon />
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
                + " ltr:ml-2 mr-2 "
              }
              onClick={toggleFiltering}
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
              + " ltr:ml-2 mr-2 "
            }
          >
            <Tooltip title={app.t('Reload')}>
              <CachedIcon />
            </Tooltip>
          </span>
        }
        {
          !menuForActions && hasData && (entityActions || hasDelete || hasEdit || edit) &&
          <span
            className={listActionIconStyle}
            onClick={() => setHiddenEntityActions(!hiddenEntityActions)}
          >
            <Tooltip title={app.t(hiddenEntityActions ? 'Show actions' : 'Hide actions')}>
              <HolismIcon
                className={hiddenEntityActions ? "text-slate-300" : "text-green-600"}
                icon={hiddenEntityActions ? ToggleOnIcon : ToggleOffIcon}
              />
            </Tooltip>
          </span>
        }
      </div>
    </div>

    <Collapse in={isFilteringOpen}>
      <div className='mb-2'>
        <Filtering filters={filters} />
      </div>
    </Collapse>

    <Items
      hasItemSelection={hasItemSelection}
      entityType={entityType}
      create={create}
      headers={headers}
      row={row}
      card={card}
      multicolumn={multicolumn}
      entityActions={entityActions}
      separateRowForActions={separateRowForActions}
      menuForActions={menuForActions}
      hasDelete={hasDelete}
      hasEdit={hasEdit}
      edit={edit}
      classProvider={classProvider}
      upsert={upsert}
      isTree={isTree}
      expanded={expanded}
      show={show}
      hiddenEntityActions={hiddenEntityActions}
    />
    {
      CreationComponent && typeof CreationComponent !== 'string'
        ?
        <DialogForm
          entityType={CreationComponent.props?.entityType}
          humanReadableEntityType={CreationComponent.props?.humanReadableEntityType}
          title={CreationComponent.props?.title}
          explanations={CreationComponent.props?.explanations}
          inputs={CreationComponent.props?.inputs}
          actions={CreationComponent.props?.actions}
          large={CreationComponent.props?.large}
        />
        :
        null
    }
    {
      UpsertComponent && typeof UpsertComponent !== 'string'
        ?
        <DialogForm
          entityType={UpsertComponent.props?.entityType}
          humanReadableEntityType={UpsertComponent.props?.humanReadableEntityType}
          title={UpsertComponent.props?.title}
          explanations={UpsertComponent.props?.explanations}
          inputs={UpsertComponent.props?.inputs}
          actions={UpsertComponent.props?.actions}
          large={UpsertComponent.props?.large}
        />
        :
        null
    }
    {
      EditionComponent && typeof EditionComponent !== 'string'
        ?
        <DialogForm
          entityType={EditionComponent.props?.entityType}
          humanReadableEntityType={EditionComponent.props?.humanReadableEntityType}
          title={EditionComponent.props?.title}
          explanations={EditionComponent.props?.explanations}
          inputs={EditionComponent.props?.inputs}
          actions={EditionComponent.props?.actions}
          large={EditionComponent.props?.large}
        />
        :
        null
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