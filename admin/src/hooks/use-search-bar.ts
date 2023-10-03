import { h, render } from 'vue'
import SearchBar from '@/components/search-bar/search-bar.vue'

class SearchBarController {
  container: HTMLDivElement;
  isShow: boolean;

  constructor() {
    this.isShow = false
    this.container = document.createElement('div')
  }

  show() {
    if (this.isShow) {
      this.dismiss()
    } else {

      const searchBar = h(SearchBar, { onClose: () => { this.dismiss() } })
      render(searchBar, this.container)
      document.body.insertBefore(this.container, document.body.firstChild);
      this.isShow = true
    }
  }

  dismiss() {
    render(null, this.container)
    document.body.removeChild(this.container)
    this.isShow = false
  }
}

const searchBar = new SearchBarController()

export function useSearchBar() {

  function openSearchBar() {
    searchBar.show()
  }

  function closeSearchBar() {
    searchBar.dismiss()
  }

  return {
    openSearchBar,
    closeSearchBar,
  }
}
