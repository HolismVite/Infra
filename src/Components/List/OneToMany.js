import { List, Progress, app, get } from '@List';

const OneToMany = ({
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
    create,
    itemActions,
    hasDelete,
    hasEdit,
    edit,
    creationButton,
    classProvider,
    oneSideUrl
}) => {

    const [oneSide, setOneSide] = useState();

    useEffect(() => {
        if (app.selectedItem) {
            setOneSide(app.selectedItem.oneSide);
        }
        else {
            //get(`/project/get/${app.parseQuery().projectId}`)
            get(oneSideUrl(app.parsedQuery()))
                .then(project => {
                    setOneSide(project.oneSide);
                }, error => {
                    app.error(error);
                });
        }
    }, []);

    return oneSide
        ?
        <List
            title={title(oneSide)}
            subtitle={subtitle}
            breadcrumbItems={breadcrumbItems}
            listActions={listActions}
            entityType={entityType}
            filters={filters}
            sorts={sorts}
            headers={headers}
            row={row}
            card={card}
            itemActions={itemActions}
            hasDelete={hasDelete}
            hasEdit={hasEdit}
            edit={edit}
            creationButton={creationButton}
            classProvider={classProvider}
            create={create}
        />
        :
        <Progress />
}

export default OneToMany;