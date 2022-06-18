import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { useContext } from 'react'
import { ListContext } from '../Contexts'

const UpsertAction = () => {

    const {
        create,
        upsert,
        upsertionIcon,
        upsertionText
    } = useContext(ListContext)

    const icon = upsertionIcon
        ?
        <HolismIcon icon={upsertionIcon} />
        :
        <AddIcon />

    return <div>
        {
            create || upsert
                ?
                <Button
                    className="bg-green-200 text-gray-900 border-gray-400 hover:bg-green-400 mt-2 lg:mt-0 mr-2"
                    variant="outlined"
                    startIcon={upsertionIcon}
                    onClick={() => {
                        if (typeof create === 'string') {
                            navigate(create)
                        }
                        else {
                            app.emit(app.creationRequested)
                        }
                    }}
                >
                    {
                        (upsertionText)
                            ?
                            app.t(upsertionText)
                            :
                            app.t("Create")
                    }
                </Button>
                :
                null
        }
    </div>
}

export default UpsertAction