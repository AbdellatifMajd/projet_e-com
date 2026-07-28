export const registerFormControls = [
    {
        name: "username",
        label: "User Name",
        componentType: "input", 
        type: "text"
    },
    {
        name: "email",
        label: "Email",
        componentType: "input", 
        type: "text"
    },
    {
        name: "password",
        label: "Password",
        componentType: "input", 
        type: "password"
    },
]

export const loginFormControls = [
    {
        name: "email",
        label: "Email", 
        componentType: "input",
        type: "text"
    },
    {
        name: "password",
        label: "Password", 
        componentType: "input", 
        type: "password"
    }
]


export const addProductFormElements = [
  {
    label: "Title",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter product title",
  },
  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter product price",
  },
  {
    label: "Discount",
    name: "discount",
    componentType: "input",
    type: "text",
    placeholder: "Enter discount (optional)",
  },
  {
    label: "Total Stock",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "Enter total stock",
  },
    {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter product description",
  },
];