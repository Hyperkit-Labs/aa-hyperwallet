'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical } from 'lucide-react'
import { ComponentType } from '@/lib/types'

interface DraggableBlockProps {
  id: ComponentType
  children: React.ReactNode
  isEnabled: boolean
}

export function DraggableBlock({ id, children, isEnabled }: DraggableBlockProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
    disabled: !isEnabled,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  if (!isEnabled) {
    return <div className="preview-block hidden-block">{children}</div>
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="preview-block relative group"
    >
      <div
        {...attributes}
        {...listeners}
        className="absolute -left-10 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center cursor-grab active:cursor-grabbing opacity-60 group-hover:opacity-100 transition-opacity z-10 bg-[#1C1C1E] rounded border border-white/10 hover:border-purple-500/50 hover:bg-[#252528]"
      >
        <GripVertical className="w-5 h-5 text-gray-400 group-hover:text-purple-400" />
      </div>
      <div 
        className="w-full relative"
        style={{
          borderLeft: isDragging ? '2px solid rgba(147, 51, 234, 0.3)' : '2px solid transparent',
          backgroundColor: isDragging ? 'rgba(147, 51, 234, 0.05)' : 'transparent',
          transition: 'all 0.2s ease',
        }}
      >
        {children}
      </div>
    </div>
  )
}

