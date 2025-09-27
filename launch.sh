#!/bin/bash

echo ""
echo "========================================"
echo "  Tirupur Ex-Im Colleagues Website"
echo "========================================"
echo ""
echo "Starting the website..."
echo ""

# Check if we're on macOS or Linux
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    open demo.html
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    # Linux
    xdg-open demo.html
else
    echo "Please open demo.html in your browser manually"
fi

echo ""
echo "Website launched successfully!"
echo ""
echo "If the website doesn't open automatically,"
echo "please open 'demo.html' or 'index.html' in your browser."
echo ""
echo "For the best experience, use Chrome, Firefox, or Edge."
echo ""