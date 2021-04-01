# Safeat Coding Style
This style guide uses the most popular coding styles from the web for JavaScript and python. It is a combination of styles from industry professionals and leading edge technology companies as well as our own personal choices.
# Frontend Guide
## Basic Rules
  - Only include one React component per file.
  - Exports go at the bottom of the file ex. `export default Login`

## Class vs stateless



## Naming

  - **Extensions**: Use `.js` extension for React components.
  - **Filename**: Use PascalCase for filenames. E.g., `ReservationCard.js`.
  - **Reference Naming**: Use PascalCase for React components and camelCase for their instances.

    ```jsx
    // bad
    import reservationCard from './ReservationCard';

    // good
    import ReservationCard from './ReservationCard';

    // bad
    const ReservationItem = <ReservationCard />;

    // good
    const reservationItem = <ReservationCard />;
    ```

  - **Component Naming**: Use the filename as the component name. For example, `ReservationCard.jsx` should have a reference name of `ReservationCard`. However, for root components of a directory, use `index.jsx` as the filename and use the directory name as the component name:

    ```jsx
    // bad
    import Footer from './Footer/Footer';

    // bad
    import Footer from './Footer/index';

    // good
    import Footer from './Footer';
    ```

  - **Props Naming**: Avoid using DOM component prop names for different purposes.

    > Why? People expect props like `style` and `className` to mean one specific thing. Varying this API for a subset of your app makes the code less readable and less maintainable, and may cause bugs.

    ```jsx
    // bad
    <MyComponent style="fancy" />

    // bad
    <MyComponent className="fancy" />

    // good
    <MyComponent variant="fancy" />
    ```


## Alignment

  - When lines become too long...

    ```jsx
    // bad
    <Foo superLongParam="bar"
         anotherSuperLongParam="baz" />

    // good
    <Foo
      superLongParam="bar"
      anotherSuperLongParam="baz"
    />

    // if props fit in one line then keep it on the same line
    <Foo bar="bar" />

    // children get indented normally
    <Foo
      superLongParam="bar"
      anotherSuperLongParam="baz"
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
          superLongParam="bar"
          anotherSuperLongParam="baz"
        />
      )
    }

    // good
    {someConditional ? (
      <Foo />
    ) : (
      <Foo
        superLongParam="bar"
        anotherSuperLongParam="baz"
      />
    )}
    ```

## Quotes

  - Always use single quotes (`'`) for all JS

    ```jsx
    // bad
    <Foo bar='bar' />

    // good
    <Foo bar="bar" />
    ```

## Spacing

  - Always include no space in your self-closing tag.

    ```jsx
    // good
    <Foo/>

    // bad
    <Foo     />
    ```

  - Do not pad JSX curly braces with spaces.

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
      UserName="hello"
      phone_number={12345678}
    />

    // good
    <Foo
      userName="hello"
      phoneNumber={12345678}
      Component={SomeComponent}
    />
    ```

  - Avoid using an array index as `key` prop, prefer a stable ID.


We don’t recommend using indexes for keys if the order of items may change.

  ```jsx
  // bad
  {todos.map((todo, index) =>
    <Todo
      {...todo}
      key={index}
    />
  )}

  // good
  {todos.map(todo => (
    <Todo
      {...todo}
      key={todo.id}
    />
  ))}
  ```

## Parentheses

  - Wrap JSX tags in parentheses when they span more than one line.
    ```jsx
    // bad
    render() {
      return <MyComponent variant="long body" foo="bar">
               <MyChild />
             </MyComponent>;
    }

    // good
    render() {
      return (
        <MyComponent variant="long body" foo="bar">
          <MyChild />
        </MyComponent>
      );
    }
    ```

  - If your component has multiline properties, close its tag on a new line.

    ```jsx
    // bad
    <Foo
      bar="bar"
      baz="baz" />

    // good
    <Foo
      bar="bar"
      baz="baz"
    />
    ```

## Methods

  - Use arrow functions always.

    ```jsx
    function ItemList(props) {
      return (
        <ul>
          {props.items.map((item, index) => (
            <Item
              key={item.key}
              onClick={(event) => { doSomethingWith(event, item.name, index); }}
            />
          ))}
        </ul>
      );
    }
    ```

  - Be sure to return a value in your `render` methods.

    ```jsx
    // bad
    render() {
      (<div />);
    }

    // good
    render() {
      return (<div />);
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