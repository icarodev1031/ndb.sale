import React, { useEffect } from "react"

export default function DressupHorizontalList({
    list,
    title,
    selectedItem,
    setSelectedItem,
    secondRow,
}) {
    const isScrollable = list.length > 3

    useEffect(() => {
        let item = document.getElementById(`items-list-view-${secondRow ? "2" : "1"}`)
        item.scrollLeft = selectedItem * 149 - 100
    }, [selectedItem])

    return (
        <div className="row m-0">
            <div className="mb-2 ps-0">{title}</div>
            <div
                id={`items-list-view-${secondRow ? "2" : "1"}`}
                className={`row me-4 dressup-modal-items-horizontal-list border-top border-bottom border-secondary border-1 ${
                    isScrollable ? "d-inline-block" : "d-auto"
                }`}
            >
                {list.map((item) => {
                    return (
                        <div
                            style={{
                                marginTop: "-1px",
                            }}
                            onClick={() => setSelectedItem(item.index)}
                            role="presentation"
                            className={`border border-4 text-center cursor-pointer ${
                                selectedItem === item.index
                                    ? "border-success"
                                    : "border-transparent"
                            }`}
                        >
                            <img src={item.icon} alt="Avatar" />
                            <div>
                                {item.price}
                                <span className="text-success">{item.unit}</span>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
