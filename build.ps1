$extensionName = 'Agfa Jenkins Chrome Extension'

# --------------
Set-Location -Path .\Extension

$extensionSlug = $extensionName.Replace(' ', '')
$output = "..\artifacts\output\$($extensionSlug).zip"

Write-Output "Zipping extension to $output..."
..\BuildTools\7z a "$output" *
Write-Output "Zipped extension to $output."

Set-Location -Path ..\