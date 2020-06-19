import React, { useContext } from 'react'
import StockItem from './StockItem'
import { Box, FormControl, InputLabel, NativeSelect } from '@material-ui/core'

// eslint-disable-next-line no-unused-vars
import { GlobalContext, IStock, WSSymbol } from '../context/Context'
import { useStyles } from '../style/Style'

const StockList: React.FC = () => {
  const classes = useStyles()
  const { state: { initialConfig, follows }, dispatch } = useContext(GlobalContext)
  const [empty, setEmpty] = React.useState(false)

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    dispatch({ type: 'FOLLOW', payload: event.target.value })
    dispatch({ type: 'SUBSCRIBE', payload: event.target.value })
  }

  const followList = follows.map((symbol:WSSymbol, index:number) => (symbol ? (
    <div key={index}>
      <StockItem>{symbol as WSSymbol}</StockItem>
    </div>
  ) : null)
  )

  const unfollowSymbols = initialConfig.supportedSymbols.filter(a => !follows.includes(a))
  const unfollowStock = initialConfig.stocksData.filter(a => unfollowSymbols.includes(a.symbol!))

  const unfollowList = unfollowStock.map(
    (stock:IStock, index:number) => (stock ? (
      <option key={index} value={stock.symbol}>{stock.companyName}</option>
    ) : null)
  )
  return (
    <div style={{ width: '100%' }}>

      <Box boxShadow={3} p={4} m={2}>

        <FormControl className={classes.formControl}>
          <InputLabel shrink htmlFor="age-native-label-placeholder">
          Empresas disponíveis
          </InputLabel>
          <NativeSelect
            value={empty}
            onChange={handleChange}
            inputProps={{
              name: 'age',
              id: 'age-native-label-placeholder'
            }}
          >
            <option value="">Selecionar para listar abaixo e acompanhar</option>
            {unfollowList}
          </NativeSelect>

        </FormControl>

        <Box borderBottom={2} mb={3} mt={1} component="div" display="block" className={classes.headerList}>
          Empresas
        </Box>
        {followList}
      </Box>
    </div>
  )
}

export default StockList
