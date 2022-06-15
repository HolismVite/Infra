import { useContext } from 'react'
import { List, Progress, app, get } from '@List';
import { ListContext } from './Contexts';

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
    entityActions,
    edit,
    creationButton,
    classProvider,
    oneSideUrl
}) => {

    const [oneSide, setOneSide] = useState();
    const {
        hasDelete,
        hasEdit
    } = useContext(ListContext)

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
            entityActions={entityActions}
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