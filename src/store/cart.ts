import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

// 定义购物车项的类型
export interface CartItem {
  id: number;
  quantity: number;
  selectedAttributes: Record<string, string>;
  product: Product;
  userId: number;
  createTime: number;
  updateTime: number;
}

// 定义商品类型
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  stock: number;
  imageUrl: string;
  gallery?: string[];
  category: string;
  isOnSale: boolean;
  attributes: Record<string, string>;
  rating: number;
  salesCount: number;
  createTime: number;
  updateTime: number;
}

// 定义最近添加商品提示的类型
export interface LastAddedItemInfo {
  productName: string;
  quantity: number;
  imageUrl: string;
}

export const useCartStore = defineStore('cart', () => {
  // 状态
  const items = ref<CartItem[]>([]);
  const selectedItems = ref<number[]>([]);
  const lastAddedItem = ref<LastAddedItemInfo | null>(null);

  // 计算属性
  const itemCount = computed(() => {
    return items.value.reduce((total, item) => total + item.quantity, 0);
  });

  const totalPrice = computed(() => {
    return items.value.reduce((total, item) => total + item.product.price * item.quantity, 0);
  });

  const selectedItemsCount = computed(() => {
    return selectedItems.value.length;
  });

  const selectedItemsTotal = computed(() => {
    return items.value
      .filter(item => selectedItems.value.includes(item.id))
      .reduce((total, item) => total + item.product.price * item.quantity, 0);
  });

  // Actions
  function addToCart(productId: number, quantity: number = 1, attributes: Record<string, string> = {}) {
    // 查找购物车中是否已存在相同商品和属性
    const existingItemIndex = items.value.findIndex(
      item => 
        item.product.id === productId && 
        JSON.stringify(item.selectedAttributes) === JSON.stringify(attributes)
    );

    if (existingItemIndex > -1) {
      // 如果存在，更新数量
      items.value[existingItemIndex].quantity += quantity;
    } else {
      // 如果不存在，添加新项目
      // 这里使用模拟数据，实际环境中应该从API获取商品详情
      const mockProduct: Product = {
        id: productId,
        name: `商品 ${productId}`,
        description: '这是一个示例商品描述',
        price: 199.00,
        originalPrice: 299.00,
        stock: 100,
        imageUrl: `https://picsum.photos/id/${productId + 20}/200/200`,
        category: '示例分类',
        isOnSale: true,
        attributes,
        rating: 4.0,
        salesCount: 500,
        createTime: Date.now(),
        updateTime: Date.now()
      };
      
      const newItem: CartItem = {
        id: Date.now(),
        quantity,
        selectedAttributes: attributes,
        product: mockProduct,
        userId: 1,
        createTime: Date.now(),
        updateTime: Date.now()
      };
      
      items.value.push(newItem);
    }
    
    // 设置最近添加的商品，用于购物车提示
    lastAddedItem.value = {
      productName: items.value.find(item => item.product.id === productId)?.product.name || `商品 ${productId}`,
      quantity,
      imageUrl: items.value.find(item => item.product.id === productId)?.product.imageUrl || ''
    };
  }

  function updateCartItem(itemId: number, quantity: number) {
    const item = items.value.find(item => item.id === itemId);
    if (item) {
      item.quantity = quantity;
      item.updateTime = Date.now();
    }
  }

  function removeCartItem(itemId: number) {
    items.value = items.value.filter(item => item.id !== itemId);
    selectedItems.value = selectedItems.value.filter(id => id !== itemId);
  }

  function clearCart() {
    items.value = [];
    selectedItems.value = [];
  }

  function toggleSelectCartItem(itemId: number) {
    const index = selectedItems.value.indexOf(itemId);
    if (index > -1) {
      selectedItems.value.splice(index, 1);
    } else {
      selectedItems.value.push(itemId);
    }
  }

  function selectAllItems() {
    selectedItems.value = items.value.map(item => item.id);
  }

  function deselectAllItems() {
    selectedItems.value = [];
  }

  function clearLastAddedItem() {
    lastAddedItem.value = null;
  }

  // 初始化一些模拟数据
  function initMockData() {
    items.value = [
      {
        id: 1,
        quantity: 2,
        selectedAttributes: {
          color: '黑色',
          size: 'M'
        },
        product: {
          id: 101,
          name: '时尚T恤',
          description: '舒适透气的棉质T恤',
          price: 99.00,
          originalPrice: 129.00,
          stock: 200,
          imageUrl: 'https://picsum.photos/id/26/200/200',
          category: '服装',
          isOnSale: true,
          attributes: {
            color: '黑色',
            size: 'M'
          },
          rating: 4.5,
          salesCount: 1000,
          createTime: Date.now(),
          updateTime: Date.now()
        },
        userId: 1,
        createTime: Date.now(),
        updateTime: Date.now()
      },
      {
        id: 2,
        quantity: 1,
        selectedAttributes: {
          color: '白色',
          size: '256GB'
        },
        product: {
          id: 102,
          name: '智能手机',
          description: '最新款高性能智能手机',
          price: 5999.00,
          originalPrice: 6999.00,
          stock: 50,
          imageUrl: 'https://picsum.photos/id/36/200/200',
          category: '电子产品',
          isOnSale: true,
          attributes: {
            color: '白色',
            size: '256GB'
          },
          rating: 4.2,
          salesCount: 800,
          createTime: Date.now(),
          updateTime: Date.now()
        },
        userId: 1,
        createTime: Date.now(),
        updateTime: Date.now()
      }
    ];
    
    // 默认选择所有购物车项
    selectAllItems();
  }

  // 初始化数据
  initMockData();

  return {
    // 状态
    items,
    selectedItems,
    lastAddedItem,
    
    // 计算属性
    itemCount,
    totalPrice,
    selectedItemsCount,
    selectedItemsTotal,
    
    // 方法
    addToCart,
    updateCartItem,
    removeCartItem,
    clearCart,
    toggleSelectCartItem,
    selectAllItems,
    deselectAllItems,
    clearLastAddedItem
  };
});
