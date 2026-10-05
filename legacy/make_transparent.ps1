Add-Type -AssemblyName System.Drawing

$srcPath = "C:\Users\164044\.gemini\antigravity\brain\28616025-0f96-4484-8ec8-0287308c0949\.user_uploaded\media_1786343983717.png"
$destPath = "C:\Users\164044\.gemini\antigravity\scratch\glowsuite\logo-transparent.png"
$origPath = "C:\Users\164044\.gemini\antigravity\scratch\glowsuite\logo.png"

Copy-Item -Path $srcPath -Destination $origPath -Force

$img = [System.Drawing.Bitmap]::FromFile($srcPath)
$bmp = New-Object System.Drawing.Bitmap($img.Width, $img.Height)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.DrawImage($img, 0, 0, $img.Width, $img.Height)
$g.Dispose()
$img.Dispose()

for ($x = 0; $x -lt $bmp.Width; $x++) {
    for ($y = 0; $y -lt $bmp.Height; $y++) {
        $pixel = $bmp.GetPixel($x, $y)
        $r = $pixel.R
        $gCol = $pixel.G
        $b = $pixel.B
        $a = $pixel.A
        
        # Calculate brightness
        $lum = ($r * 0.299 + $gCol * 0.587 + $b * 0.114)
        
        if ($lum -gt 240) {
            # White background -> transparent
            $bmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
        }
        elseif ($lum -lt 90 -and $a -gt 100) {
            # Dark text ("SALON MANAGEMENT SYSTEM") -> change to white
            $bmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($a, 250, 250, 250))
        }
        elseif ($lum -gt 200) {
            # Smooth anti-aliased edge fading
            $alphaFactor = (240 - $lum) / 40.0
            $newA = [int]($a * $alphaFactor)
            if ($newA -lt 0) { $newA = 0 }
            if ($newA -gt 255) { $newA = 255 }
            $bmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($newA, $r, $gCol, $b))
        }
    }
}

$bmp.Save($destPath, [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()
Write-Host "Refined high-quality transparent logo saved!"
