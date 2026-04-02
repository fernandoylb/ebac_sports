import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type Produto = {
  id: number
  nome: string
  preco: number
  imagem: string
}

type CartState = {
  items: Produto[]
}

const initialState: CartState = {
  items: []
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    adicionar: (state, action: PayloadAction<Produto>) => {
      const produto = action.payload

      const existe = state.items.find((p) => p.id === produto.id)

      if (!existe) {
        state.items.push(produto)
      }
    },
    remover: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((p) => p.id !== action.payload)
    },
    limpar: (state) => {
      state.items = []
    }
  }
})

export const { adicionar, remover, limpar } = cartSlice.actions
export default cartSlice.reducer