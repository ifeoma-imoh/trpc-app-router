
import React, { ChangeEvent, FormEvent } from "react";

type Props = {
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
    addingContact: "error" | "idle" | "loading" | "success"
};

export default function Form({ onInputChange, handleSubmit, addingContact }: Props) {
    return (
        <div className="border p-4">
            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-2">
                <div>
                    <label htmlFor="name" className="text-xs font-semibold mb-1">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        onChange={onInputChange}
                        className="w-full border border-slate-300 text-sm p-1 rounded-sm focus:outline-none"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email" className="text-xs font-semibold mb-1">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        onChange={onInputChange}
                        className="w-full border border-slate-300 text-sm p-1 rounded-sm focus:outline-none"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="phone" className="text-xs font-semibold mb-1">
                        Phone
                    </label>
                    <input
                        type="text"
                        id="phone"
                        onChange={onInputChange}
                        className="w-full border border-slate-300 text-sm p-1 rounded-sm focus:outline-none"
                        required
                    />
                </div>
                <button className="bg-cyan-600 p-2 font-semibold text-sm text-white rounded-sm my-4 disabled:bg-slate-400" disabled={addingContact === "loading"}>
                    {addingContact === "loading" ? "Loading..." : "Add Contact"}
                </button>
                {addingContact === "error" && <p className="text-center text-xs italic py-2">An error occured</p>}
            </form>
        </div>
    );
}