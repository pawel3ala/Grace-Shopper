import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Field, reduxForm} from 'redux-form'
import {Input, List, Sidebar} from 'semantic-ui-react'

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

const RenderFilter = createRenderer(({onChange, value}, label, {data}) => (
  <List selection divided verticalAlign="middle">
    {data.map(({id, name}) => (
      <List.Item key={id} onClick={() => onChange(id)}>
        <List.Header>{name}</List.Header>
      </List.Item>
    ))}
  </List>
))

// const RenderSlider = createRenderer((input, label, ...rest) =>
//   console.log(rest)
// )

const CatalogSidebar = ({handleSubmit, submitting}) => {
  const dispatch = useDispatch()
  const categories = useSelector(({categories}) => categories) || [
    {id: 1, name: 'Cat'},
    {id: 2, name: 'Dog'},
    {id: 3, name: 'Lion'},
    {id: 4, name: 'Gurturde'}
  ]

  return (
    <div style={{height: '100%', width: 300}}>
      <form onSubmit={handleSubmit}>
        <Field name="search" label="Search" component={RenderInput} />
        <br />
        <Field
          name="categories"
          label="Category Filter"
          component={RenderFilter}
          data={categories}
        />
      </form>
    </div>
  )
}

export default reduxForm({form: 'query'})(CatalogSidebar)
// export default CatalogSidebar
