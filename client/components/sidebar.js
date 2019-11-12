import React, {useEffect} from 'react'
// import {useSelector, useDispatch} from 'react-redux'
import {Field, reduxForm} from 'redux-form'
import {Input, Select, Sidebar} from 'semantic-ui-react'

// const RenderSelect = createRenderer((input, label, {children}) => (
//   <Select {...input}>{children}</Select>
// ))

// const RenderSlider = createRenderer((input, label, ...rest) =>
//   console.log(rest)
// )

const createRenderer = render => ({
  input,
  meta: {error, touched},
  label,
  ...rest
}) => (
  <div>
    <label>{label}</label>
    {render(input, label, rest)}
    {error && touched && <span>{error}</span>}
  </div>
)

const RenderInput = createRenderer((input, label) => (
  <Input {...input} placeholder={label} />
))

const CatalogSidebar = ({handleSubmit, submitting}) => {
  return (
    <div style={{height: '100%', width: 300}}>
      <form onSubmit={handleSubmit}>
        <Field name="search" label="Search" component={RenderInput} />
      </form>
    </div>
  )
}

export default reduxForm({form: 'query'})(CatalogSidebar)
// export default CatalogSidebar
