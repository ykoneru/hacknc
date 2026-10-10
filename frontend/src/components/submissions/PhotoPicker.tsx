import { useEffect, useRef, useState } from 'react'
import { Camera, ImagePlus, RefreshCw } from 'lucide-react'
import { ACCEPTED_PHOTO_TYPES, validatePhoto } from '../../services/submissionService'

// Phone: "Take photo" opens the rear camera via the capture attribute.
// Desktop browsers ignore capture, so both buttons fall back to a file picker.
export function PhotoPicker({ photo, onChange, disabled }: { photo: File | null; onChange: (file: File | null) => void; disabled?: boolean }) {
  const cameraInput = useRef<HTMLInputElement>(null)
  const libraryInput = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!photo) { setPreview(null); return }
    const url = URL.createObjectURL(photo)
    setPreview(url)
    return () => URL.revokeObjectURL(url)
  }, [photo])

  function handle(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    const problem = validatePhoto(file)
    setError(problem)
    if (!problem) onChange(file)
  }

  const inputs = <>
    <input ref={cameraInput} type="file" accept={ACCEPTED_PHOTO_TYPES.join(',')} capture="environment" className="hidden" onChange={handle} />
    <input ref={libraryInput} type="file" accept={ACCEPTED_PHOTO_TYPES.join(',')} className="hidden" onChange={handle} />
  </>

  if (preview) return <div>
    {inputs}
    <div className="relative overflow-hidden rounded-[2rem] bg-[#ecebe4]">
      <img src={preview} alt="Your quest photo" className="aspect-square w-full object-cover" />
      {!disabled && <div className="absolute inset-x-3 bottom-3 flex gap-2">
        <button type="button" onClick={() => cameraInput.current?.click()} className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-[#fffdf8]/95 py-3 text-sm font-bold shadow backdrop-blur"><RefreshCw size={16} />Retake</button>
        <button type="button" onClick={() => libraryInput.current?.click()} className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-[#fffdf8]/95 py-3 text-sm font-bold shadow backdrop-blur"><ImagePlus size={16} />Replace</button>
      </div>}
    </div>
    {error && <p className="mt-2 text-sm font-semibold text-[#c4472d]">{error}</p>}
  </div>

  return <div>
    {inputs}
    <div className="flex aspect-square flex-col items-center justify-center gap-4 rounded-[2rem] border-2 border-dashed border-black/15 bg-white/60 p-6 text-center">
      <div className="grid h-16 w-16 place-items-center rounded-3xl bg-[#ffdb65]"><Camera size={28} /></div>
      <div><p className="display text-2xl">Show us what you did</p><p className="text-sm text-[#8d9187]">JPEG, PNG, or WebP · up to 5 MB</p></div>
      <div className="flex w-full max-w-xs flex-col gap-2">
        <button type="button" disabled={disabled} onClick={() => cameraInput.current?.click()} className="flex items-center justify-center gap-2 rounded-2xl bg-[#20231f] py-3.5 font-bold text-white"><Camera size={18} />Take photo</button>
        <button type="button" disabled={disabled} onClick={() => libraryInput.current?.click()} className="flex items-center justify-center gap-2 rounded-2xl border border-black/10 bg-white py-3.5 font-bold"><ImagePlus size={18} />Choose from library</button>
      </div>
    </div>
    {error && <p className="mt-2 text-sm font-semibold text-[#c4472d]">{error}</p>}
  </div>
}
