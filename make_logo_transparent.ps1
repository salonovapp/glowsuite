Add-Type -AssemblyName System.Drawing

$srcPath = 'C:\Users\164044\.gemini\antigravity\brain\28616025-0f96-4484-8ec8-0287308c0949\.user_uploaded\media_1786355412576.png'
$destPath = 'C:\Users\164044\.gemini\antigravity\scratch\glowsuite\logo-transparent-hq.png'

$src = [System.Drawing.Bitmap]::new($srcPath)
$width = $src.Width
$height = $src.Height

Write-Host "Source dimensions: ${width}x${height}"

# Create a 3x upscaled bitmap for higher quality
$scale = 3
$newW = $width * $scale
$newH = $height * $scale

$upscaled = [System.Drawing.Bitmap]::new($newW, $newH, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$g = [System.Drawing.Graphics]::FromImage($upscaled)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$g.DrawImage($src, 0, 0, $newW, $newH)
$g.Dispose()

# Remove white/near-white background pixels
for ($x = 0; $x -lt $newW; $x++) {
    for ($y = 0; $y -lt $newH; $y++) {
        $pixel = $upscaled.GetPixel($x, $y)
        $r = $pixel.R
        $g2 = $pixel.G
        $b = $pixel.B
        # If pixel is near white (all channels > 235)
        if ($r -gt 235 -and $g2 -gt 235 -and $b -gt 235) {
            $upscaled.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 255, 255, 255))
        }
    }
}

$upscaled.Save($destPath, [System.Drawing.Imaging.ImageFormat]::Png)
$src.Dispose()
$upscaled.Dispose()

Write-Host "Saved transparent HQ PNG to: $destPath"
Write-Host "Output dimensions: ${newW}x${newH}"
