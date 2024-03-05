interface DividerProps {
  fullWidth?: boolean
}

export function Divider({ fullWidth }: DividerProps) {
  return (
    <div className="relative h-4">
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-[1%] border-t border-gray-800" />
        {fullWidth ? (
          <div className="w-[99%] border-t border-gray-300" />
        ) : (
          <div className="w-[59%] border-t border-gray-300" />
        )}
      </div>
    </div>
  )
}
