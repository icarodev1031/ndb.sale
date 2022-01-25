import React, { useState, useReducer } from "react"
import { useSelector } from "react-redux"
import Modal from "react-modal"
import parse from "html-react-parser"
import styled from "styled-components"
import { DressupData } from "../../utilities/dressup-data"
import { CloseIcon, EmptyAvatar } from "../../utilities/imgImport"
import DressupHorizontalList from "./dressup-user-horizontal-list"
import { hairColors } from "./dressup-data"

const init = {
    hairStyles: { index: 0, updatable: false },
    facialStyles: { index: 0, updatable: false },
    expressions: { index: 0, updatable: false },
    hats: { index: 0, updatable: false },
    others: { index: 0, updatable: false },
    hairColors: { index: 0, updatable: false },
}

export default function DressupModal({ isModalOpen, setIsModalOpen, onSave }) {
    const avatarComponents = useSelector((state) => state.avatarComponents)

    let { loaded, hairStyles, facialStyles, expressions, hats, others } = avatarComponents
    // Convert the mapKey Object to the array.
    hairStyles = Object.values(hairStyles)
    facialStyles = Object.values(facialStyles)
    expressions = Object.values(expressions)
    hats = Object.values(hats)
    others = Object.values(others)

    const [state, setState] = useReducer((old, action) => ({ ...old, ...action }), init)

    const [selectedTab, setSelectedTab] = useState(0)

    const saveAvatarItems = () => {
        const avatarSets = Object.keys(avatarComponents)
            .filter((key) => state[key]?.updatable ?? false)
            .map((key) => {
                const index = state[key].index
                return {
                    groupId:
                        Object.values(avatarComponents[key])[index]?.groupId ?? key.slice(0, -1),
                    compId: Object.values(avatarComponents[key])[index]?.compId ?? 0,
                }
            })

        if (!!avatarSets.length) onSave(avatarSets)
        setIsModalOpen(false)
    }

    const closeModal = () => {
        setState(init)
        setIsModalOpen(false)
    }

    const selectedHairColor = state.hairColors?.index ?? 0
    const selectedHairStyle = state.hairStyles?.index ?? 0
    const selectedFacialStyle = state.facialStyles?.index ?? 0
    const selectedHat = state.hats?.index ?? 0
    const selectedExpression = state.expressions?.index ?? 0
    const selectedOther = state.others?.index ?? 0

    return (
        <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            ariaHideApp={false}
            className="dress-up-modal"
            overlayClassName="dress-up-modal__overlay"
        >
            <div className="dress-up-modal__header">
                <div onClick={closeModal} onKeyDown={closeModal} role="button" tabIndex="0">
                    <img
                        width="14px"
                        height="14px"
                        src={CloseIcon}
                        className="mt-3 me-3"
                        alt="close"
                    />
                </div>
            </div>

            <div className="row m-0 py-4 text-white">
                <div className="col-sm-4">
                    <div className="row">
                        <div className="profile">
                            <div className="image_div">
                                <img src={EmptyAvatar} alt="back" />
                                {loaded && (
                                    <>
                                        <Hair
                                            hairColor={hairColors[selectedHairColor]}
                                            style={{
                                                top: `${hairStyles[selectedHairStyle]?.top}%`,
                                                left: `${hairStyles[selectedHairStyle]?.left}%`,
                                                width: `${hairStyles[selectedHairStyle]?.width}%`,
                                            }}
                                        >
                                            {parse(hairStyles[selectedHairStyle]?.svg ?? "")}
                                        </Hair>
                                        <div
                                            style={{
                                                top: `${expressions[selectedExpression]?.top}%`,
                                                left: `${expressions[selectedExpression]?.left}%`,
                                                width: `${expressions[selectedExpression]?.width}%`,
                                            }}
                                        >
                                            {parse(expressions[selectedExpression]?.svg ?? "")}
                                        </div>
                                        <div
                                            style={{
                                                top: `${facialStyles[selectedFacialStyle]?.top}%`,
                                                left: `${facialStyles[selectedFacialStyle]?.left}%`,
                                                width: `${facialStyles[selectedFacialStyle]?.width}%`,
                                            }}
                                        >
                                            {parse(facialStyles[selectedFacialStyle]?.svg ?? "")}
                                        </div>
                                        <div
                                            style={{
                                                top: `${hats[selectedHat]?.top}%`,
                                                left: `${hats[selectedHat]?.left}%`,
                                                width: `${hats[selectedHat]?.width}%`,
                                            }}
                                        >
                                            {parse(hats[selectedHat]?.svg ?? "")}
                                        </div>
                                        <div
                                            style={{
                                                top: `${others[selectedOther]?.top}%`,
                                                left: `${others[selectedOther]?.left}%`,
                                                width: `${others[selectedOther]?.width}%`,
                                            }}
                                        >
                                            {parse(others[selectedOther]?.svg ?? "")}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* <span className="text-center dress-up-modal-avatar-name mt-3">Tesla</span> */}
                        <div className="dress-up-modal-sections-list">
                            {DressupData.tabs.map((item) => (
                                <div
                                    onClick={() => setSelectedTab(item.index)}
                                    onKeyDown={() => setSelectedTab(item.index)}
                                    role="presentation"
                                    key={item.index}
                                    className={`${item.index === selectedTab && "active"}`}
                                >
                                    {item.title}
                                </div>
                            ))}
                        </div>
                        <button className="btn-save" onClick={saveAvatarItems}>
                            save
                        </button>
                    </div>
                </div>
                <div className="col-sm-8 components">
                    {loaded && selectedTab === 0 && (
                        <div className="dress-up-modal-hair-section">
                            <DressupHorizontalList
                                topic="hairStyle"
                                title={"hair style"}
                                list={hairStyles}
                                selectedItem={selectedHairStyle}
                                setSelectedItem={(res) => setState({ hairStyles: res })}
                            />
                            <div className="mt-4"></div>
                            <DressupHorizontalList
                                topic="hairColor"
                                title={"hair color"}
                                hairStyle={selectedHairStyle}
                                hairStyles={hairStyles}
                                list={hairColors}
                                selectedItem={selectedHairColor}
                                setSelectedItem={(res) => setState({ hairColors: res })}
                                secondRow
                            />
                        </div>
                    )}
                    {loaded && selectedTab === 1 && (
                        <div className="dress-up-modal-hair-section">
                            <DressupHorizontalList
                                topic="facialStyle"
                                title={"facial style"}
                                list={facialStyles}
                                selectedItem={selectedFacialStyle}
                                setSelectedItem={(res) => setState({ facialStyles: res })}
                            />
                            <div className="mt-4"></div>
                            <DressupHorizontalList
                                topic="expression"
                                title={"expressions"}
                                list={expressions}
                                selectedItem={selectedExpression}
                                setSelectedItem={(res) => setState({ expressions: res })}
                                secondRow
                            />
                        </div>
                    )}
                    {loaded && selectedTab === 2 && (
                        <div className="dress-up-modal-hair-section">
                            <DressupHorizontalList
                                topic="hat"
                                title={"hats"}
                                list={hats}
                                selectedItem={selectedHat}
                                setSelectedItem={(res) => setState({ hats: res })}
                            />
                            <div className="mt-4"></div>
                            <DressupHorizontalList
                                topic="other"
                                title={"others"}
                                list={others}
                                selectedItem={selectedOther}
                                setSelectedItem={(res) => setState({ others: res })}
                                secondRow
                            />
                        </div>
                    )}
                </div>
            </div>
        </Modal>
    )
}

const Hair = styled.div`
    svg > path {
        fill: ${(props) => {
            return props.hairColor ? props.hairColor : "#626161"
        }};
    }
`
