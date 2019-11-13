import React, {useEffect} from 'react'
import {useSelector} from 'react-redux'
import {
  Input,
  List,
  Rating,
  Grid,
  Label,
  Segment,
  Header,
  Button,
  Sidebar
} from 'semantic-ui-react'
import {queryParams} from '../../script/helperFuncs'
// import throttle from 'lodash.throttle'

const CatalogSidebar = () => {
  const categories = useSelector(({categories}) => categories) || []
  const [
    {page = 1, limit = 10, sort = 'id.ASC', search, category, price, review},
    setQuery
  ] = queryParams()

  const handleChange = ({target: {name, value}}) => {
    setQuery({[name]: value}, 'pushIn')
  }

  useEffect(() => setQuery({page, limit, sort}, 'pushIn'), [])
  return (
    <div style={{height: '100%', width: 350}}>
      <form>
        <Grid.Column width={12}>
          <Input
            icon={{name: 'search', circular: true}}
            name="search"
            value={search}
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
                  <List.Item
                    key={id}
                    name="category"
                    onClick={() => setQuery({page: 1, category: id}, 'pushIn')}
                  >
                    <List.Header>{name}</List.Header>
                  </List.Item>
                ))}
                <Button
                  type="button"
                  onClick={() => setQuery({category: undefined}, 'pushIn')}
                >
                  Clear Filter
                </Button>
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
                  type="number"
                  label={{
                    content: dir
                  }}
                  labelPosition={i % 2 ? 'right' : 'left'}
                  style={{width: '5rem'}}
                  name={name}
                  value={price && price[name] / 100}
                  placeholder={label}
                  onChange={({target: {value}}) =>
                    setQuery(
                      {
                        page: 1,
                        price: {
                          ...price,
                          [name]: value ? value * 100 : undefined
                        }
                      },
                      'pushIn'
                    )
                  }
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
                name="review"
                maxRating={5}
                rating={(review && review.gte) || 0}
                icon="star"
                onRate={(_, {rating}) =>
                  handleChange({target: {name: 'review', value: {gte: rating}}})
                }
              />{' '}
              +
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
