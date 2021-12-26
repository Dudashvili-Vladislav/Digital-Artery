import { Snackbar } from "material-ui"


export const errorMessage = (message) => {
    return <Snackbar open={open}
        autoHideDuration={6000}

        message={message.toString()}
    />
}