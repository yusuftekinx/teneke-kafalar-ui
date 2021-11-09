


export const loginRedirect = (props,history) => {
    if(props.user.username === ''){
        history.push('/login')
    }
}