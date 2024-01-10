
"use client";
import { trpc } from "@/app/_trpc/client";
import React, { useState, FormEvent, ChangeEvent } from "react";
import Form from "./Form";

export type FormData = {
    name: string;
    email: string;
    phone: string;
};

export default function Main() {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        phone: "",
    });

    const getContacts = trpc.getContacts.useQuery();

    const addContact = trpc.addContact.useMutation({
        onSettled: () => {
            getContacts.refetch();
        },
    });

    const deleteContact = trpc.deleteContact.useMutation({
        onSettled: () => {
            getContacts.refetch();
        },
    });

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, [`${e.target.id}`]: e.target.value }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await addContact.mutate(formData);
        } catch (error) {
            console.log(error);
        } finally {
            e.target.reset();
        }
    };

    const handleDelete = async (contactId: number) => {
        try {
            await deleteContact.mutate({ id: contactId });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div>
                <Form
                    onInputChange={onInputChange}
                    handleSubmit={handleSubmit}
                    addingContact={addContact.status}
                />
            </div>
            <div className="w-full flex flex-col gap-4">
                {getContacts.isLoading ? (
                    <p className="text-center">Loading...</p>
                ) : getContacts.data?.length === 0 ? (
                    <p className="text-center">No contacts yet!</p>
                ) : (
                    getContacts.data?.map((contact) => (
                        <div
                            key={contact.id}
                            className="w-full border p-4 flex flex-col gap-2"
                        >
                            <h3 className="text-cyan-600 font-semibold">{contact.name}</h3>
                            <div className="flex gap-2 items-center text-xs">
                                <svg
                                    width="16px"
                                    height="16px"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M3.75 5.25L3 6V18L3.75 18.75H20.25L21 18V6L20.25 5.25H3.75ZM4.5 7.6955V17.25H19.5V7.69525L11.9999 14.5136L4.5 7.6955ZM18.3099 6.75H5.68986L11.9999 12.4864L18.3099 6.75Z"
                                        fill="#080341"
                                    />
                                </svg>
                                <p>{contact.email}</p>
                            </div>
                            <div className="flex gap-2 items-center text-xs">
                                <svg
                                    width="16px"
                                    height="16px"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M3 5.5C3 14.0604 9.93959 21 18.5 21C18.8862 21 19.2691 20.9859 19.6483 20.9581C20.0834 20.9262 20.3009 20.9103 20.499 20.7963C20.663 20.7019 20.8185 20.5345 20.9007 20.364C21 20.1582 21 19.9181 21 19.438V16.6207C21 16.2169 21 16.015 20.9335 15.842C20.8749 15.6891 20.7795 15.553 20.6559 15.4456C20.516 15.324 20.3262 15.255 19.9468 15.117L16.74 13.9509C16.2985 13.7904 16.0777 13.7101 15.8683 13.7237C15.6836 13.7357 15.5059 13.7988 15.3549 13.9058C15.1837 14.0271 15.0629 14.2285 14.8212 14.6314L14 16C11.3501 14.7999 9.2019 12.6489 8 10L9.36863 9.17882C9.77145 8.93713 9.97286 8.81628 10.0942 8.64506C10.2012 8.49408 10.2643 8.31637 10.2763 8.1317C10.2899 7.92227 10.2096 7.70153 10.0491 7.26005L8.88299 4.05321C8.745 3.67376 8.67601 3.48403 8.55442 3.3441C8.44701 3.22049 8.31089 3.12515 8.15802 3.06645C7.98496 3 7.78308 3 7.37932 3H4.56201C4.08188 3 3.84181 3 3.63598 3.09925C3.4655 3.18146 3.29814 3.33701 3.2037 3.50103C3.08968 3.69907 3.07375 3.91662 3.04189 4.35173C3.01413 4.73086 3 5.11378 3 5.5Z"
                                        stroke="#000000"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                <p>{contact.phone}</p>
                            </div>
                            <div className="flex gap-2 mt-2">
                                <button
                                    className="py-1 px-6 bg-red-400 text-white text-xs font-semibold"
                                    onClick={() => handleDelete(contact.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </>
    );
}