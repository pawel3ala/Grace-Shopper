import React, {useEffect, useState} from 'react'
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
  Sidebar,
  Icon
} from 'semantic-ui-react'
import {queryParams} from '../../script/helperFuncs'

const CatalogSidebar = () => {
  const categories = useSelector(({categories}) => categories) || []
  const [
    {page = 1, limit = 15, sort = 'id.ASC', search, category, price, review},
    setQuery
  ] = queryParams()

  const [vis, setVis] = useState(false)
  const handleChange = ({target: {name, value}}) => {
    setQuery({[name]: value}, 'pushIn')
  }

  // setTimeout(() => {
  //   setVis(!vis)
  // }, 1000)
  // console.log(vis)

  useEffect(() => setQuery({page, limit, sort}, 'pushIn'), [])
  return !vis ? (
    <Button
      type="button"
      color="blue"
      style={{marginLeft: 10}}
      onClick={() => {
        event.preventDefault()
        setVis(!vis)
      }}
    >
      Filter
    </Button>
  ) : (
    <>
      <Button
        type="button"
        color="blue"
        style={{marginLeft: 10}}
        onClick={() => {
          event.preventDefault()
          setVis(!vis)
        }}
      >
        Filter
      </Button>
      <Sidebar
        as={Segment}
        animation="push"
        direction="left"
        visible={vis}
        width="wide"
      >
        <form>
          <Grid style={{marginBottom: -40, marginLeft: -40}}>
            <Grid.Column floated="left">
              <Button
                icon
                color="red"
                onClick={() => {
                  event.preventDefault()
                  setVis(!vis)
                }}
              >
                <Icon name="close" />
              </Button>
            </Grid.Column>
          </Grid>
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
                      onClick={() =>
                        setQuery({page: 1, category: id}, 'pushIn')
                      }
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
          <Segment vertical>
            <Grid>
              <Grid.Column width={6}>
                <Segment>
                  <Label attached="top left">Filter</Label>
                  <select
                    name="sortCol"
                    value={sort.split('.')[0]}
                    onChange={({target: {value}}) =>
                      setQuery({sort: `${value}.${sort.split('.')[1]}`})
                    }
                  >
                    <option name="id" value="id" />
                    <option name="name" value="name">
                      Name
                    </option>
                    <option name="price" value="price">
                      Price
                    </option>
                  </select>
                </Segment>
              </Grid.Column>
              <Grid.Column width={6}>
                <Segment>
                  <Label attached="top left">Direction</Label>
                  <select
                    name="sortCol"
                    value={sort.split('.')[1]}
                    onChange={({target: {value}}) =>
                      setQuery({sort: `${sort.split('.')[0]}.${value}`})
                    }
                  >
                    <option name="ASC" value="ASC">
                      Low to High
                    </option>
                    <option name="DESC" value="DESC">
                      High to Low
                    </option>
                  </select>
                </Segment>
              </Grid.Column>
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
                    handleChange({
                      target: {name: 'review', value: {gte: rating}}
                    })
                  }
                />
              </Segment>
              {/* <Button type="submit" floated="right">
              Search
            </Button> */}
            </Grid.Column>
          </Grid>
          <Grid style={{marginTop: -40}}>
            <Grid.Column textAlign="right" floated="right">
              <Button
                icon
                color="green"
                onClick={() => {
                  event.preventDefault()
                  setVis(!vis)
                }}
              >
                Done
              </Button>
            </Grid.Column>
          </Grid>
        </form>
      </Sidebar>
    </>
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
