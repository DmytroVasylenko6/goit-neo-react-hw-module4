import Button from '../Button'

interface LoadMoreBtnProps {
  onLoadMore: () => void
}

export default function LoadMoreBtn({ onLoadMore }: LoadMoreBtnProps) {
  return (
    <Button
      type="button"
      text="load more"
      styles="loadMore"
      listener={onLoadMore}
    />
  )
}
