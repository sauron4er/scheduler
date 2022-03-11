import json
from nomenclature.models import Language
from templates.components.try_except import try_except


@try_except
def get_languages_list(request):
    other_languages = Language.objects.filter(is_active=True)
    if request.user.userprofile.language:
        other_languages = other_languages.exclude(id=request.user.userprofile.language_id)
    else:
        other_languages = other_languages.exclude(id=request.user.userprofile.country.language_id)
    return [{
        'id': lang.id,
        'name': lang.name
    } for lang in other_languages]


@try_except
def get_my_language(request):
    if request.user.userprofile.language:
        return {
            'id': request.user.userprofile.language.id,
            'name': request.user.userprofile.language.name,
            'short': request.user.userprofile.language.short
        }
    else:
        return {
            'id': request.user.userprofile.country.language.id,
            'name': request.user.userprofile.country.language.name,
            'short': request.user.userprofile.country.language.short
        }


@try_except
def get_my_language_short(request):
    return request.user.userprofile.language.short \
        if request.user.userprofile.language \
        else request.user.userprofile.country.language.short


@try_except
def get_language_params(request, page=''):
    my_language = get_my_language(request)

    parameters = {
        'my_language': my_language['name'],
        'languages': get_languages_list(request),
        'base_lang_pack': get_base_lang_pack(my_language['short']),
        'react_lang_pack': get_react_lang_pack(page, my_language['short']) if page else None
    }

    return parameters


@try_except
def get_base_lang_pack(language_short):
    with open('static/languages/base.json', encoding='utf8') as json_file:
        json_file = json.loads(json_file.read())
        return json_file[language_short]


@try_except
def get_react_lang_pack(page, language_short):
    with open('static/languages/' + page + '.json', encoding='utf8') as json_file:
        json_file = json.loads(json_file.read())
        return json_file[language_short]
