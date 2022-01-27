import React from "react"
import { Link } from "gatsby"
import Modal from "react-modal"
import { useAuth } from "../../hooks/useAuth"
import { ROUTES } from "../../utilities/routes"
import { CloseIcon } from "../../utilities/imgImport"

export default function ReferToFriendsModal({ isModalOpen, setIsModalOpen }) {
    const auth = useAuth()
    return (
        <Modal
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
            className="refer-modal"
            overlayClassName="refer-modal__overlay"
        >
            <div className="refer-modal__header">
                Invite friends
                <div
                    onClick={() => setIsModalOpen(false)}
                    onKeyDown={() => setIsModalOpen(false)}
                    role="button"
                    tabIndex="0"
                >
                    <img width="14px" height="14px" src={CloseIcon} alt="close" />
                </div>
            </div>
            <div className="refer-modal__body">
                {auth?.isLoggedIn() ? (
                    <>
                        <div className="mt-1">Earn coin together</div>
                        <form className="mt-4">
                            <label className="w-100">
                                <span className="refer-modal__body-label">Referral ID</span>
                                <input
                                    type="text"
                                    placeholder="Referral ID"
                                    className="form-control"
                                />
                            </label>

                            <label className="w-100 mt-3">
                                <span className="refer-modal__body-label">Referral link</span>
                                <input
                                    type="text"
                                    placeholder="Referral link"
                                    className="form-control"
                                />
                            </label>
                            <div className="text-center">
                                <div className="refer-modal__body-invite-btn">invite friends</div>
                            </div>
                        </form>
                    </>
                ) : (
                    <>
                        <div className="mt-1 h6 fw-normal">To invite a friend, please log in</div>
                        <div className="d-flex align-items-center justify-content-center mt-3 gap-lg-2 m-0">
                            <Link
                                to={ROUTES.signIn}
                                className="btn btn-success rounded-0 text-uppercase fw-bold col-lg-6"
                            >
                                sign in
                            </Link>
                            <Link
                                to={ROUTES.signUp}
                                className="btn btn-outline-light rounded-0 text-uppercase fw-bold col-lg-6"
                            >
                                sign up
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </Modal>
    )
}
