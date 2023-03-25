NC='\033[0m' # No Color
error='\033[0;31m';
ongoing='\033[0;34m';
success='\033[0;32m';
warning='\033[0;33m';
style='\033[1m'; # bold

echo ""
echo "  -------------------------------------------"
echo "       Starting ${ongoing}${style}builing ${NC}for \033[0;36m${style}Production${NC}... "
echo "  -------------------------------------------"
echo ""

echo "   Please choose \033[0;36m${style}type${NC} of Update"
echo ""
echo "      1. ${style}Major${NC} - ${warning} Will update the ${style}first digit in version ${NC}"
echo "      2. ${style}Minor${NC} - ${warning} Will update the ${style}second digit in version ${NC}"
echo "      3. ${style}Patch${NC} - ${warning} Will update the ${style}third digit in version ${NC}"
echo ""
read TYPE
echo ""

echo ""
echo "       ${ongoing}${style}Updating versions in ${NC}Package JSONs..."
echo ""

node ./scripts/release/versionUpdater.cjs --type=$TYPE

echo ""
echo "       ${ongoing}${style}Building ${NC}Now..."
echo ""

pnpm build
echo ""
node -e 'require("./scripts.cjs").gitUpdate()'

echo ""
echo "${NC}  -------------------------------------------"
echo "${success}                  ${style}ALL DONE!"
echo "${NC}  -------------------------------------------"
