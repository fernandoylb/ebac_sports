import { useState } from 'react'
import Header from './components/Header'
import Produtos from './containers/Produtos'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from './store/store'
import { adicionar } from './slices/cartSlice'
import { GlobalStyle } from './styles'
import { useGetProdutosQuery } from './services/api'
import { Produto } from './types'

function App() {
  const [favoritos, setFavoritos] = useState<Produto[]>([])
  const carrinho = useSelector((state: RootState) => state.cart.items)
  const dispatch = useDispatch()
  const { data: produtos = [], isLoading } = useGetProdutosQuery()

  function adicionarAoCarrinho(produto: Produto) {
    if (carrinho.find((p) => p.id === produto.id)) {
      alert('Item já adicionado')
    } else {
      dispatch(adicionar(produto))
    }
  }

  function favoritar(produto: Produto) {
    if (favoritos.find((p) => p.id === produto.id)) {
      const favoritosSemProduto = favoritos.filter(
        (p) => p.id !== produto.id
      )
      setFavoritos(favoritosSemProduto)
    } else {
      setFavoritos([...favoritos, produto])
    }
  }

  if (isLoading) return <p>Carregando...</p>

  return (
    <>
      <GlobalStyle />
      <div className="container">
        <Header
          favoritos={favoritos}
          itensNoCarrinho={carrinho}
        />
        <Produtos
          produtos={produtos}
          favoritos={favoritos}
          favoritar={favoritar}
          adicionarAoCarrinho={adicionarAoCarrinho}
        />
      </div>
    </>
  )
}

export default App