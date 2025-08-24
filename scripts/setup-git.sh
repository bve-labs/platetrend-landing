#!/bin/bash
echo "What's the business name?"
read business_name
echo "What's the email?"
read email

git config user.name "$business_name"
git config user.email "$email"
echo "Git configured for $business_name"