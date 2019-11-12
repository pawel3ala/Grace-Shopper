import React from 'react'
import {useSelector} from 'react-redux'
import {Field, FormSection, reduxForm} from 'redux-form'
import {Input, List, Rating, Grid, Button, Sidebar} from 'semantic-ui-react'

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

const RenderInput = createRenderer((input, label, {style}) => (
  <Input {...input} style={style} placeholder={label} />
))

const RenderFilter = createRenderer(({onChange, value}, label, {data}) => (
  <List animated selection divided verticalAlign="middle">
    {data.map(({id, name}) => (
      <List.Item key={id} onClick={() => onChange(id)}>
        <List.Header>{name}</List.Header>
      </List.Item>
    ))}
  </List>
))

const RenderRating = createRenderer(({onChange, value, name}, label) => (
  <Rating
    size="huge"
    name={name}
    label={label}
    rating={value}
    maxRating={5}
    icon="star"
    onRate={(_, data) => onChange({gte: data.rating})}
  />
))

// const RenderRange = createRenderer((input, label) => console.log('hi'))
const RangeComp = () => (
  <Grid>
    {[
      {name: 'gte', label: 'Price Low'},
      {name: 'lte', label: 'Price High'}
    ].map(p => (
      <Grid.Column key={p.name} width={4}>
        <Field style={{width: '7rem'}} {...p} component={RenderInput} />
      </Grid.Column>
    ))}
  </Grid>
)

const CatalogSidebar = ({handleSubmit, submitting, sendQuery}) => {
  const categories = useSelector(({categories}) => categories) || []
  return (
    <div style={{height: '100%', width: 300}}>
      <form onSubmit={handleSubmit(sendQuery)}>
        <Field name="search" label="Search" component={RenderInput} />
        <br />
        <Field
          name="category"
          label="Category Filter"
          component={RenderFilter}
          data={categories}
        />
        <br />
        <FormSection name="price" label="Price Range" component={RangeComp} />
        <br />
        <Field name="review" label="Average Rating" component={RenderRating} />
        <br />
        <Button type="submit">Search</Button>
      </form>
    </div>
  )
}

export default reduxForm({
  form: 'query',
  initialValues: {
    sort: 'id.ASC',
    page: 1,
    limit: 10,
    price: {},
    review: {},
    category: 0,
    search: ''
  },
  destroyOnUnmount: false
})(CatalogSidebar)
// export default CatalogSidebar
