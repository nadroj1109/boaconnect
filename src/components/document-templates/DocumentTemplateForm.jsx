import {
    useContext,
    useMemo,
    useRef,
} from "react";

import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

import {
    InformationCircleIcon,
    LockClosedIcon,
} from "@heroicons/react/24/outline";

import FormContext from "../../contexts/FormContext";

const SYSTEM_VARIABLES = [
    {
        group: "Barangay Details",

        items: [
            {
                label: "Barangay Name",
                value: "{{ barangay.barangay }}",
            },
            {
                label: "City/Municipality Name",
                value: "{{ barangay.municipality }}",
            },
            {
                label: "Province Name",
                value: "{{ barangay.province }}",
            },
        ],
    },
    {
        group: "Resident",

        items: [
            {
                label: "Full Name",
                value: "{{ resident.full_name }}",
            },

            {
                label: "Age",
                value: "{{ resident.age }}",
            },

            {
                label: "Address",
                value: "{{ resident.address }}",
            },

            {
                label: "Civil Status",
                value: "{{ resident.civil_status }}",
            },
        ],
    },

    {
        group: "Household",

        items: [
            {
                label: "Household Number",
                value: "{{ household.household_no }}",
            },

            {
                label: "Household Address",
                value: "{{ household.address }}",
            },
        ],
    },

    {
        group: "Request",

        items: [
            {
                label: "Request Number",
                value: "{{ request.request_no }}",
            },

            {
                label: "Document Number",
                value: "{{ request.document_no }}",
            },

            {
                label: "Purpose",
                value: "{{ request.purpose }}",
            },

            {
                label: "Remarks",
                value: "{{ request.remarks }}",
            },

            {
                label: "Request Date",
                value: "{{ request.requested_at }}",
            },

            {
                label: "Approval Date",
                value: "{{ request.approved_at }}",
            },

            {
                label: "Generated Date",
                value: "{{ request.generated_at }}",
            },

            {
                label: "Signed Date",
                value: "{{ request.signed_at }}",
            },

            {
                label: "Released Date",
                value: "{{ request.released_at }}",
            },
        ],
    },
];

const DEFAULT_HEADER = `
<p style="text-align: center;">
    <strong>REPUBLIC OF THE PHILIPPINES</strong><br>
    PROVINCE OF {{ barangay.province }}<br>
    MUNICIPALITY OF {{ barangay.municipality }}<br>
    <strong>BARANGAY {{ barangay.name }}</strong><br>
    <strong>OFFICE OF THE PUNONG BARANGAY</strong>
</p>
`;

const DEFAULT_FOOTER = `
<p style="text-align: center;">
    <strong>{{ barangay.chairperson }}</strong><br>
    Punong Barangay
</p>
`;

export default function DocumentTemplateForm({

    documentTypes = [],

    documentTypeId,

    onDocumentTypeChange,

    selectedDocumentType,

}) {

    const form = useContext(
        FormContext
    );

    const bodyEditorRef =
        useRef(null);

    /*
    |--------------------------------------------------------------------------
    | Form values
    |--------------------------------------------------------------------------
    */

    const content =
        form.getValue(
            "content",
            ""
        );

    const orientation =
        form.getValue(
            "orientation",
            "portrait"
        );

    /*
    |--------------------------------------------------------------------------
    | Dynamic Document Type Fields
    |--------------------------------------------------------------------------
    */

    const fieldVariables = useMemo(
        () =>
            selectedDocumentType?.fields?.map(
                (field) => ({
                    label: field.name,

                    value:
                        `{{ fields.${field.field_key} }}`,
                })
            ) ?? [],
        [
            selectedDocumentType,
        ]
    );

    /*
    |--------------------------------------------------------------------------
    | Variables
    |--------------------------------------------------------------------------
    */

    const variables = useMemo(
        () => {

            const groups = [
                ...SYSTEM_VARIABLES,
            ];

            if (
                fieldVariables.length > 0
            ) {

                groups.push({
                    group:
                        "Document Fields",

                    items:
                        fieldVariables,
                });

            }

            return groups;

        },
        [
            fieldVariables,
        ]
    );

    /*
    |--------------------------------------------------------------------------
    | Quill
    |--------------------------------------------------------------------------
    */

    const toolbarId =
        "document-template-toolbar";

    const modules =
        useMemo(
            () => ({
                toolbar:
                    `#${toolbarId}`,
            }),
            []
        );

    /*
    |--------------------------------------------------------------------------
    | Insert Variable
    |--------------------------------------------------------------------------
    */

    function insertVariable(
        variable
    ) {

        const editor =
            bodyEditorRef.current
                ?.getEditor();

        if (!editor) {
            return;
        }

        const range =
            editor.getSelection(true);

        const index =
            range?.index ??
            editor.getLength();

        editor.insertText(
            index,
            variable
        );

        editor.setSelection(
            index +
                variable.length,
            0
        );

    }

    return (

        <div className="space-y-5">

            {/* -----------------------------------------------------------------
                Template Information
            ----------------------------------------------------------------- */}

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                <div>

                    <label className="mb-1 block text-sm font-medium text-gray-700">

                        Template Name

                    </label>

                    <input
                        type="text"
                        value={form.getValue(
                            "name",
                            ""
                        )}
                        onChange={(e) =>
                            form.setValue(
                                "name",
                                e.target.value
                            )
                        }
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        placeholder="e.g. Barangay Clearance"
                    />

                    {form.getError("name") && (

                        <p className="mt-1 text-xs text-red-600">

                            {form.getError("name")}

                        </p>

                    )}

                </div>


                <div>

                    <label className="mb-1 block text-sm font-medium text-gray-700">

                        Description

                    </label>

                    <input
                        type="text"
                        value={form.getValue(
                            "description",
                            ""
                        )}
                        onChange={(e) =>
                            form.setValue(
                                "description",
                                e.target.value
                            )
                        }
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        placeholder="Optional description"
                    />

                    {form.getError("description") && (

                        <p className="mt-1 text-xs text-red-600">

                            {form.getError(
                                "description"
                            )}

                        </p>

                    )}

                </div>

            </div>


            {/* -----------------------------------------------------------------
                Page Settings
            ----------------------------------------------------------------- */}

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

                <div>

                    <label className="mb-1 block text-sm font-medium text-gray-700">

                        Page Size

                    </label>

                    <select
                        value={form.getValue(
                            "page_size",
                            "A4"
                        )}
                        onChange={(e) =>
                            form.setValue(
                                "page_size",
                                e.target.value
                            )
                        }
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                    >

                        <option value="A4">
                            A4
                        </option>

                        <option value="Letter">
                            Letter
                        </option>

                        <option value="Legal">
                            Legal
                        </option>

                    </select>

                    {form.getError("page_size") && (

                        <p className="mt-1 text-xs text-red-600">

                            {form.getError(
                                "page_size"
                            )}

                        </p>

                    )}

                </div>


                <div>

                    <label className="mb-1 block text-sm font-medium text-gray-700">

                        Orientation

                    </label>

                    <select
                        value={form.getValue(
                            "orientation",
                            "portrait"
                        )}
                        onChange={(e) =>
                            form.setValue(
                                "orientation",
                                e.target.value
                            )
                        }
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                    >

                        <option value="portrait">
                            Portrait
                        </option>

                        <option value="landscape">
                            Landscape
                        </option>

                    </select>

                    {form.getError("orientation") && (

                        <p className="mt-1 text-xs text-red-600">

                            {form.getError(
                                "orientation"
                            )}

                        </p>

                    )}

                </div>


                <div className="flex items-end">

                    <label className="flex cursor-pointer items-center gap-2 pb-2">

                        <input
                            type="checkbox"
                            checked={form.getValue(
                                "is_active",
                                true
                            )}
                            onChange={(e) =>
                                form.setValue(
                                    "is_active",
                                    e.target.checked
                                )
                            }
                            className="h-4 w-4 rounded border-gray-300 text-blue-600"
                        />

                        <span className="text-sm font-medium text-gray-700">

                            Active

                        </span>

                    </label>

                </div>

            </div>


            {/* -----------------------------------------------------------------
                Document Type Context
            ----------------------------------------------------------------- */}

            <div>

                <div className="mb-2 flex items-center gap-2">

                    <InformationCircleIcon
                        className="h-5 w-5 text-blue-500"
                    />

                    <span className="text-sm font-medium text-gray-700">

                        Document Type Context

                    </span>

                </div>


                <div className="rounded-lg border border-blue-100 bg-blue-50 p-3">

                    <select
                        value={
                            documentTypeId ?? ""
                        }
                        onChange={(e) =>
                            onDocumentTypeChange?.(
                                e.target.value
                                    ? Number(
                                        e.target.value
                                    )
                                    : null
                            )
                        }
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >

                        <option value="">
                            Select document type
                        </option>

                        {documentTypes.map(
                            (documentType) => (

                                <option
                                    key={
                                        documentType.id
                                    }
                                    value={
                                        documentType.id
                                    }
                                >

                                    {documentType.code}
                                    {" — "}
                                    {documentType.name}

                                </option>

                            )
                        )}

                    </select>


                    <p className="mt-1 text-xs text-gray-500">

                        Select a document type to display
                        its available document fields.

                    </p>

                </div>

            </div>


            {/* -----------------------------------------------------------------
                Variable Insertion
            ----------------------------------------------------------------- */}

            <div>

                <div className="mb-2 flex items-center gap-2">

                    <InformationCircleIcon
                        className="h-5 w-5 text-blue-500"
                    />

                    <span className="text-sm font-medium text-gray-700">

                        Insert Variable

                    </span>

                </div>


                <div className="space-y-3 rounded-lg border border-blue-100 bg-blue-50 p-3">

                    {variables.map(
                        (group) => (

                            <div
                                key={
                                    group.group
                                }
                            >

                                <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-500">

                                    {group.group}

                                </div>


                                <div className="flex flex-wrap gap-2">

                                    {group.items.map(
                                        (variable) => (

                                            <button
                                                key={
                                                    variable.value
                                                }
                                                type="button"
                                                onClick={() =>
                                                    insertVariable(
                                                        variable.value
                                                    )
                                                }
                                                className="rounded-md border border-blue-200 bg-white px-2.5 py-1.5 text-xs font-medium text-blue-700 hover:bg-blue-100"
                                            >

                                                {variable.label}

                                            </button>

                                        )
                                    )}

                                </div>

                            </div>

                        )
                    )}

                    {selectedDocumentType &&
                        fieldVariables.length === 0 && (

                            <p className="text-xs text-gray-500">

                                This document type has no
                                active document fields.

                            </p>

                        )}

                </div>

            </div>


            {/* -----------------------------------------------------------------
                Document Editor
            ----------------------------------------------------------------- */}

            <div>

                <div className="mb-2">

                    <label className="text-sm font-medium text-gray-700">

                        Document Content

                    </label>

                    <p className="text-xs text-gray-500">

                        The header and footer are fixed.
                        Only the document body can be edited.

                    </p>

                </div>


                {/* Quill Toolbar */}

                <div
                    id={toolbarId}
                    className="document-template-toolbar ql-toolbar ql-snow rounded-t-lg border border-gray-300 bg-gray-50"
                >

                    <span className="ql-formats">

                        <select className="ql-font" />

                        <select className="ql-size" />

                    </span>


                    <span className="ql-formats">

                        <button className="ql-bold" />

                        <button className="ql-italic" />

                        <button className="ql-underline" />

                        <button className="ql-strike" />

                    </span>


                    <span className="ql-formats">

                        <select className="ql-color" />

                        <select className="ql-background" />

                    </span>


                    <span className="ql-formats">

                        <select className="ql-align" />

                    </span>


                    <span className="ql-formats">

                        <button
                            className="ql-list"
                            value="ordered"
                        />

                        <button
                            className="ql-list"
                            value="bullet"
                        />

                    </span>


                    <span className="ql-formats">

                        <button
                            className="ql-indent"
                            value="-1"
                        />

                        <button
                            className="ql-indent"
                            value="+1"
                        />

                    </span>


                    <span className="ql-formats">

                        <button className="ql-blockquote" />

                        <button className="ql-link" />

                    </span>


                    <span className="ql-formats">

                        <button className="ql-clean" />

                    </span>

                </div>


                {/* Document Workspace */}

                <div
                    className={`
                        document-editor
                        document-editor-${orientation}
                    `}
                >

                    {/* Header */}

                    <div className="document-editor-header">

                        <div className="mb-1 flex items-center justify-end">

                            <LockClosedIcon
                                className="h-4 w-4 text-gray-400"
                            />

                        </div>

                        <div
                            className="document-header-content"
                            dangerouslySetInnerHTML={{
                                __html:
                                    DEFAULT_HEADER,
                            }}
                        />

                    </div>


                    {/* Editable Body */}

                    <div className="document-editor-body">

                        <ReactQuill
                            ref={bodyEditorRef}
                            theme="snow"
                            value={content}
                            onChange={(value) =>
                                form.setValue(
                                    "content",
                                    value
                                )
                            }
                            modules={modules}
                        />

                    </div>


                    {/* Footer */}

                    <div className="document-editor-footer">

                        <div className="mb-1 flex items-center justify-end">

                            <LockClosedIcon
                                className="h-4 w-4 text-gray-400"
                            />

                        </div>

                        <div
                            className="document-footer-content"
                            dangerouslySetInnerHTML={{
                                __html:
                                    DEFAULT_FOOTER,
                            }}
                        />

                    </div>

                </div>


                {form.getError("content") && (

                    <p className="mt-1 text-xs text-red-600">

                        {form.getError(
                            "content"
                        )}

                    </p>

                )}

            </div>

        </div>

    );

}