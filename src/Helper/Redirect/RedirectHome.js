

export const homeRedirect = (props,history) => {
    if(props.user.username !== ''){
        history.push('/community')
    }
}

