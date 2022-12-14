from .common import FavouriteSerializer
from jwt_auth.serializers.common import UserSerializer
from active_ingredients.serializers.profile_populated import FavePopulatedActive_IngredientSerializer
from recipes.serializers.profile_populated import FavePopulatedRecipeSerializer

class OwnedFavouriteSerializer(FavouriteSerializer):
    owner = UserSerializer()

class RelatedFavouriteSerializer(FavouriteSerializer):
    active_ingredient = FavePopulatedActive_IngredientSerializer()
    recipe = FavePopulatedRecipeSerializer()
