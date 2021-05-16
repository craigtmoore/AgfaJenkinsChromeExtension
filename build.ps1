$extensionName = 'Agfa Jenkins Chrome Extension'

# --------------

$extensionSlug = $extensionName.Replace(' ', '')
$output = "artifacts\output\$($extensionSlug).zip"

Write-Output "Zipping extension to $output..."
.\BuildTools\7z a "$output" .\Extension | ForEach-Object { "  " + $_ }
Write-Output "Zipped extension to $output."
