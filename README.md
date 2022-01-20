# Crypto Exchange Rate

## Tech Stack

-   Framework (self-maintained): [react-shiba](https://github.com/Jamyth/react-shiba)
    -   React
    -   History
    -   rxjs
    -   react-router
-   Utilities (self-maintained): [@iamyth/util](https://github.com/Jamyth/util)
    -   Array, Object, Promise, Enum, Number related utils
    -   React related types & hooks, usePrevious / SafeReactChildren
-   UI Library:
    -   [Material-UI](https://mui.com/)
        -   Pre-built React Components
        -   Theming
    -   [recharts](https://recharts.org/en-US/)
        -   Nice Chart Components
-   Testing:
    -   [jest](https://jestjs.io/)
        -   Main Testing Framework
    -   [ts-jest](https://github.com/kulshekhar/ts-jest)
        -   TypeScript Wrapper of jest, allowing \*.test.ts
-   Build Tools
    -   [ViteJS](https://vitejs.dev/)
        -   Really Fast Web bundler
    -   [vite-tsconfig-paths](https://github.com/aleclarson/vite-tsconfig-paths)
        -   Vite Plugin for absolute paths
    -   [Babel Related]
        -   Adding support to Vite for decorators
    -   [Docker](https://www.docker.com/)
        -   Containerize the web application for easy deployment

## Notices

Most of the codes are using utility functions from `@iamyth/util` and that library already has a bunch of tests on each functions, for simplicity, I didn't copy and paste those tests here.

Some of them are located in `src/util` folder, and those utils will be tested .

## Project Structure

```bash
## Project Structure
.
├── build/                   # Compiled files
├── config/                  # Project configurations (typescript, jest, vite)
├── src/                     # Source files
│   ├── component/           # Reusable React Components
│   ├── module/              # Application Modules (contains Layout & Logic)
│   ├── type/                # Global Type Definition files
│   ├── util/                # Reusable utilities functions
│   ├── index.html           # Application Entry HTML
│   └── index.ts             # Application Entry Point
├── test/                    # Automated tests
│   └── util/                # Test Files for `src/util`
└── README.md
```

```bash
## Module Structure
.
├── Main/                    # Layout Components
├── index.ts                 # Entry Point of the module, (contains module state, actions)
├── hooks.ts                 # React Hooks used the module
└── type.ts                  # Type Definition for the module, e.g. PathParam, State
```

## Walk-through

> Whole application logic are located in `src/module/main/`.

1. Fetch BTC exchange rate once per minute.

    - `react-shiba` provides a lifecycle method called `onTick`, that will be triggered after a certain amount of time. This could fulfill the need of once per minute.
    - `react-shiba` also provide a decorator called `@Interval()`, which tells the module what is the interval between each call of `onTick()`, simply set it to `@Interval(60)`

2. Store the exchange rate in a sensible structure.

    - I was thinking about storing the data directly without a copy of a previous one, and use `@iamyth/util`'s `usePrevious` hooks to memorize the previous data fetched.
    - But the result is not good while changing tabs, the previous result got wiped with latest data while the tabs re-render.
    - Finally, I stored a copy of the real-time data as a previous data
    - Module State related: `state.data` & `state.prevData`

3. Create a view to show the history for a given currency
4. Create a view to show the average price for all currencies for a given time frame

    - I created a tab called `historical data`, combined with the average price, because these two requirement shares the same API result
    - Since the API returns over 100+ currencies, if directly render it to a chart, it will cause unexpected performance issues, so added a new array to store the selected currencies to reduce the calculations in `recharts`
    - Module State related: `state.filter` & `state.chartCurrencyFilter` & `state.historicalData`

5. Create a view to show the latest price for all currencies

    - Use `PriceUtil.compare` to check the current price is a growth or loss
    - Use `EnumUtil.toArray` to convert Currency Enum to array for component rendering
    - Simple Animation to indicate which currency is updated

6. `react-shiba` provide a function `ajax` to fire http request, used to fetch real-time data and historical data

7. AJAX related functions are located in `src/util/service/`

8. API Types are located in `src/type/api.ts`

Thank you so much for spending time reading this.
