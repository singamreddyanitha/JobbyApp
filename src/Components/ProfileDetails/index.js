import { useEffect, useState} from "react"
import Loader from "react-loader-spinner"
import Cookies from "js-cookie"

import "./index.css"

const apiStatusConstants = {
    initial: "INITIAL",
    success: "SUCCESS",
    failure: "FAILURE",
    inProgress: "INPROGRESS"
}

const ProfileDetails = () => {
        const [profileData, setProfileData] = useState([])
        const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)

    useEffect(() => {
        getProfile()
    }, [])

    const getProfile = async () => {
        setApiStatus(apiStatusConstants.inProgress)
        const apiUrl = 'https://apis.ccbp.in/profile'
        const jwtToken = Cookies.get("jwt_token")
        const options = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }, 
        }

        const response = await fetch(apiUrl, options)
        const data = await response.json() 

        if (response.ok === true) {
            const profileData = {
                name: data.profile_details.name,
                profileImageUrl: data.profile_details.profile_image_url,
                shortBio: data.profile_details.short_bio,
            }
        setProfileData(apiStatusConstants.success)
        setProfileData(profileData)
        } else {
            setApiStatus(apiStatusConstants.failure)
        }
    }

    const renderProfileView = () => {
        const {name, profileImageUrl, shortBio} = profileData
       return (
        <div className="profile-success-container">
        <img src={profileImageUrl} alt="profile" className="profile-img" />
        <h1 className="profile-heading">{name}</h1>
        <p className="profile-bio">{shortBio}</p>
      </div>
        )
    }
    
    const renderFailureView = () => (
        <div className="profile-error-view-container">
          <button
            type="button"
            id="button"
            className="profile-failure-button"
            onClick={getProfile}
          >
            Retry
          </button>
        </div>
      )
    
      const renderLoadingView = () => (
        <div className="profile-loader-container " id="loader">
          <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
        </div>
      )
    

    const renderSwitch = () => {
        switch (apiStatus) {
            case apiStatusConstants.success:
                return renderProfileView()
            case apiStatusConstants.failure:
                return renderFailureView();
            case apiStatusConstants.inProgress:
                return renderLoadingView()
            default:
                return null
        }

    }

    return (
        <>
            {renderSwitch()}
        </>
    )


}

export default ProfileDetails