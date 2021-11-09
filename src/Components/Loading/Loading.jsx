import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import LoadingComponent from '../../img/loadingAnimation.svg'
import './Loading.css'
export const Loading = ({ event = null,children,...props }) => {
    const [loading, setLoading] = useState(props.loading);

    useEffect(() => {
        setLoading(props.loading)
        
        setTimeout(async() => {
            if(event !== null){
                await event();
            }
            setLoading(false);
        }, 1000);
    },[])

    return (
        <div>
            {
                loading === true ? <div  className="loading-component">
                    <img src={LoadingComponent} width="96" height="96"></img>
                    <span className="loading-text poppinsText">Yükleniyor...</span>
                </div> : children
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    return state;    
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//         action: bindActionCreators(onChangeStateToUser, dispatch),
//       };
// }

export default connect(mapStateToProps)(Loading)

