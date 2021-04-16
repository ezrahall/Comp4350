# Safeat Enforced Coding Style
This style guide uses the most popular coding styles from the web for JavaScript and python. It is a combination of styles from industry professionals and leading edge technology companies as well as our own personal choices. This is the complete list of coding styles used by team Thanatos for project Safeat. It is separated into frontend and backend styles as they are written in two different languages.

# Frontend Guide
## Basic Rules
  - Only include one React component per file.
  - Exports go at the bottom of the file ex. `export default Login`
  - Package/React imports at the top of a file followed by a space then local imports. 
  - Styles are separated into modules and go in styles directory.
  - Styles are lower case and contain two underscores ex. `.cancel__contentImageContainer`.

## Naming

  - **Extensions**: Use `.js` extension for React components.
  - **Files**: Use PascalCase for components, use camelCase for `styles` or services.

    ```jsx
    // bad
    import autoCompleteTextField from './AutoCompleteTextField';

    // good
    import AutoCompleteTextField from './AutoCompleteTextField';

    // bad
    import SignIn from '../../../store/actions/user';

    // good
    import signIn from '../../../store/actions/user';
    ```
  - **Directories**: Same as files, except lower case for directories with sub-directories. 
  - **Components**: Use the file name as the component name and as the directory name.

    ```jsx
    // bad
    import Footer from '.Thing/Address';

    // good 
    import Footer from './Address/Address';
    ```
  - **Constants for non-functions**: UPPERCASE_WITH_UNDERSCORES 

## Alignment

  - When lines become too long.

    ```jsx
    // bad
    <Foo superLongParam='bar'
         anotherSuperLongParam='baz' />

    // good
    <Foo
      superLongParam='bar'
      anotherSuperLongParam='baz'
    />

    // if props fit in one line then keep it on the same line
    <Foo bar='bar' />

    // children get indented normally
    <Foo
      superLongParam='bar'
      anotherSuperLongParam='baz'
    >
      <Quux />
    </Foo>

    // bad
    {showButton &&
      <Button />
    }

    // bad
    {
      showButton &&
        <Button />
    }

    // good
    {showButton && (
      <Button />
    )}

    // good
    {showButton && <Button />}

    // good
    {someReallyLongConditional
      && anotherLongConditional
      && (
        <Foo
          superLongParam='bar'
          anotherSuperLongParam='baz'
        />
      )
    }

    // good
    {someConditional ? (
      <Foo />
    ) : (
      <Foo
        superLongParam='bar'
        anotherSuperLongParam='baz'
      />
    )}
    ```

## Quotes

  - Always use single quotes (`'`) for all JS

    ```jsx
    // good
    <Foo bar='bar' />

    // bad
    <Foo bar="bar" />
    ```

## Spacing

  - Always include no space in the closing tag.

    ```jsx
    // good
    <Foo/>

    // bad
    <Foo     />
    ```

  - Do not pad JS curly braces with spaces.

    ```jsx
    // bad
    <Foo bar={ baz } />

    // good
    <Foo bar={baz} />
    ```

## Props

  - Always use camelCase for prop names, or PascalCase if the prop value is a React component.

    ```jsx
    // bad
    <Foo
      UserName='hello'
      phone_number={12345678}
    />

    // good
    <Foo
      userName='hello'
      phoneNumber={12345678}
      Component={SomeComponent}
    />
    ```

## Parentheses

  - Wrap JS tags in parentheses when they span more than one line.
    ```jsx
    // bad
    render() {
      return <MyComponent variant='long body' foo='bar'>
               <MyChild />
             </MyComponent>;
    }

    // good
    render() {
      return (
        <MyComponent variant='long body' foo='bar'>
          <MyChild />
        </MyComponent>
      );
    }
    ```

  - If your component has multiline properties, close its tag on a new line.

    ```jsx
    // bad
    <Foo
      bar='bar'
      baz='baz' />

    // good
    <Foo
      bar='bar'
      baz='baz'
    />
    ```

## Methods

  - Use arrow functions always.

    ```jsx
    const Login = (props) => {
      // do stuff
    }
    ```

## Ordering

  - Ordering for `React.Component`:

  1. `useStyles`
  1. `Alert`
  1. `constructor`
  1. `state`
  1. `useEffect`
  1. `componentWillMount`
  1. `componentDidMount`
  1. *all other internal functions* like `validate`
  1. *event handlers starting with 'handle'* like `handleSubmit()`
  1. *event handlers starting with 'on'* like `onClickSubmit()` 
  1. `render` or `return`

# Backend Guide

## Basic Rules
- Use tabs for indentation.
- Only one Blueprint/Model/Test Suite per file.
- Methods in a file should be local only.

## Continuing long statements
- To continue a statement you can use backslashes in which case you should align the next line with the last dot or equal sign, or indent.
  ```python
  this_is_a_very_long(function_call, 'with many parameters') \
      .that_returns_an_object_with_an_attribute

  MyModel.query.filter(MyModel.scalar > 120) \
              .order_by(MyModel.name.desc()) \
              .limit(10)
  ```
- If statement is `SQL` query then end of lines need one space and no backslash.
  ```python
      restaurant_data = session.execute('select st.id, st.name, st.email '
                                        'from staff as st '
                                        'where st.active = 1 '
                                        'and st.restaurant = :restaurant ',
                                        {'restaurant': data['restaurant']})
  ```
- If you break in a statement with parentheses, align to the parentheses.
  ```python
  this_is_a_very_long(function_call, 'with many parameters',
                      23, 42, 'and even more')
  ```
- If you break in a json statement with braces, align text with beginning of json and align closing braces with variable name.
  ```python
  res = client.post('/Api/User/Login', json={
        'email': "TES@gmail.com",
        'password': "test"
  }, content_type='application/json')
  ```

## Blank lines
- Top level functions and classes are separated by two lines, everything else by one. Do not use too many blank lines to separate logical segments in code. 
  ```python
    def hello(name):
        print 'Hello %s!' % name


    def goodbye(name):
        print 'See you %s.' % name


    class MyClass(object):

        def __init__(self, name):
            self.name = name

        def get_annoying_name(self):
            return self.name.upper() + '!!!!111'
  ```

## Expressions and Statements
- No whitespace for unary operators that are not words (e.g.: -, ~ etc.) as well on the inner side of parentheses.
  ```python
  # good
  exp = -1.05
  value = (item_value / item_count) * offset / exp
  value = my_list[index]
  value = my_dict['key']

  # bad
  exp = - 1.05
  value = ( item_value / item_count ) * offset / exp
  value = (item_value/item_count)*offset/exp
  value=( item_value/item_count ) * offset/exp
  value = my_list[ index ]
  value = my_dict ['key']
  ```

## Comparisons
- Against arbitrary types use `==` and `!=`.
- Against singletons with `is` and `is not`.
- Never compare something with True or False use `not truthy`.


## Naming
- **Class names**: PascalCase, with acronyms kept uppercase
- **Variable names**: lowercase_with_underscores
- **Method and function names**: lowercase_with_underscores
- **Constants**: UPPERCASE_WITH_UNDERSCORES
  ```python
  class Restaurant(UserMixin, db.Model):

  date_start, date_end = get_date_range(parameters['date'])

  def get_date_range(date):
  ```

## Comments
- If it’s just one line, the closing triple quote is on the same line as the opening, otherwise the text is on the same line as the opening quote and the triple quote that closes the string on its own line.
  ```python
  def foo():
      """This is a string"""


  def bar():
      """This is a longer string with so much information in there
      that it spans three lines.  In this case the closing triple quote
      is on its own line.
      """
  ```