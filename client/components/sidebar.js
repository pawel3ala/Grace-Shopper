import React from 'react'
import {useSelector} from 'react-redux'
import {Field, FormSection, reduxForm} from 'redux-form'
import {
  Input,
  List,
  Rating,
  Grid,
  Button,
  Label,
  Segment,
  Header,
  Sidebar
} from 'semantic-ui-react'
import {
  useQueryParams,
  StringParam,
  QueryParamProvider,
  NumberParam
} from 'use-query-params'

const handleChange = () => {
  console.log('ch-ch-ch-changes')
}

// const RenderRange = createRenderer((input, label) => console.log('hi'))

const CatalogSidebar = () => {
  const categories = useSelector(({categories}) => categories) || []
  return (
    <div style={{height: '100%', width: 350}}>
      <form>
        <Grid.Column width={12}>
          <Input
            icon={{name: 'search', circular: true}}
            name="search"
            onChange={handleChange}
            placeholder="Search"
          />
        </Grid.Column>
        <Segment vertical>
          <Grid>
            <Grid.Column verticalAlign="middle" width={4}>
              <Header as="h3">Categories</Header>
            </Grid.Column>
            <Grid.Column width={8}>
              <List
                animated
                selection
                divided
                verticalAlign="middle"
                floated="right"
              >
                {categories.map(({id, name}) => (
                  <List.Item key={id} onClick={handleChange}>
                    <List.Header>{name}</List.Header>
                  </List.Item>
                ))}
              </List>
            </Grid.Column>
          </Grid>
        </Segment>
        <Segment vertical>
          <Label attached="top left">Price</Label>
          <Grid>
            {[
              {name: 'gte', label: 'Price', dir: 'Low'},
              {name: 'lte', label: 'Price', dir: 'High'}
            ].map(({name, label, dir}, i) => (
              <Grid.Column key={name} width={6}>
                <Input
                  label={{
                    content: dir
                  }}
                  labelPosition={i % 2 ? 'right' : 'left'}
                  style={{width: '5rem'}}
                  name={name}
                  placeholder={label}
                  onChange={handleChange}
                />
              </Grid.Column>
            ))}
          </Grid>
        </Segment>
        <Grid centered>
          <Grid.Column>
            <Segment>
              <Label ribbon>Average Rating</Label>
              <Rating
                size="huge"
                name="rating"
                maxRating={5}
                icon="star"
                onRate={handleChange}
              />
            </Segment>
            {/* <Button type="submit" floated="right">
              Search
            </Button> */}
          </Grid.Column>
        </Grid>
      </form>
    </div>
  )
}

export default CatalogSidebar

// export default reduxForm({
//   form: 'query',
//   initialValues: {
//     sort: 'id.ASC',
//     page: 1,
//     limit: 10,
//     price: {},
//     review: {},
//     category: 0,
//     search: ''
//   },
//   destroyOnUnmount: false
// })(CatalogSidebar)
// export default CatalogSidebar
