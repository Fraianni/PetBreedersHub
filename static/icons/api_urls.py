from django.urls import path,include

from theme.views.documenti import stampaContratto

from .views.django import *
from .views.attrezzatura import GetAllUnassignedEquipments, GetAllAssignedEquipments, GetAssignedEquipments, \
    GetUnassignedEquipments, RemoveEquipment, UpdateEquipments
from .views.test import *
from rest_framework.routers import DefaultRouter
from theme.views.usersAndtools import *
from theme.views.checklist import *
from theme.views.stampa import *
from theme.views.presenza import *
from theme.views.notifiche import *
from theme.views.push_nots import *
from theme.views.service_worker import *
from theme.views.uploadcsv import *
from theme.views.activity import *
router = DefaultRouter()
router.register(r'Attivita', AttivitaViewSet)
router.register(r'Programmazione', ProgrammazioneViewSet, basename='programmazione')
router.register(r'users', UserViewSet,basename='user')
router.register(r'tools', ToolViewSet,basename='tools')

router.register(r'commesse', CommessaViewSet,basename='commesse')
router.register(r'presenze', PresenzaViewSet,basename='presenze')
router.register(r'attrezzatura', AttrezzaturaViewSet,basename='attrezzatura')
router.register(r'attrezzatura-filtrata', AttrezzaturaFiltrataViewSet,basename='attrezzatura-filtrata')
router.register(r'consumo-giorno', ConsumoGiornoViewSet,basename='consumo-giorno')
router.register(r'commessa-giorno', CommessaGiornoViewSet,basename='commessa-giorno')
router.register(r'checklists', ChecklistViewSet)
router.register(r'checklistitems', CheckListItemViewSet)
router.register(r'checklistitemsattivita', CheckListItemAttivitaViewSet)
router.register(r'ferie', FerieViewSet,basename='ferie')



urlpatterns = [
    path('', include(router.urls)),
    path('createprogrammazione/', CreateOrUpdateProgrammazioneView.as_view(), name='create_programmazione'),
    path('createorupdatecommessagiorno/', CreateOrUpdateCommessaGiornoView.as_view(), name='create_commessagiorno'),
    path('inserimento-csv/', InserimentoCsv.as_view(), name='inserimento_csv'),
    path('create-utente/', CreateUtenteAPIView.as_view(), name='create_utente'),
    path('presenze-per-mese/', PresenzaViewSet.as_view({'get': 'presenze_per_mese'}), name='presenze-per-mese'),
    path('download-report/', download_report, name='download-report'),
    path('attivita-commesse-giorno/<str:selected_date>/', attivita_commesse_giorno, name='attivita_commesse_giorno'),
    path('commesse-non-programmazione/<str:selected_date>/', commesse_non_programmazione, name='commesse_non_programmazione'),
    path('checkattivitaselectedcommessa/<int:commessa_id>/', check_attivita_selected_commessa, name='check_attivita_selected_commessa'),
    path('update_stato/<int:attivita_id>/', UpdateStatoAttivitaView.as_view(), name='update_stato'),
    path('remove_from_prog/<str:data>/<int:attivita_id>/', RemoveFromProgView.as_view(), name='remove_from_prog'),
    path('assign-extra-checklist/', assign_extra_checklist, name='assign_extra_checklist'),
    path('stampa-ordine/<int:ordine_id>/', genera_pdf_contratto, name='genera_pdf_contratto'),
    path('check-user-group/', CheckUserGroupView.as_view(), name='check_user_group'),
    path('checklistswithoutcantiere/', checklists_without_cantiere, name='checklists_without_cantiere'),

    path('getAllUnassignedEquipments/', GetAllUnassignedEquipments.as_view(), name='get_all_unassigned_equipments'),
    path('getAllAssignedEquipments/', GetAllAssignedEquipments.as_view(), name='get_all_assigned_equipments'),
    path('getUnassignedEquipments/<int:commessa_id>/', GetUnassignedEquipments.as_view(),name='get_assigned_equipments'),
    path('getAssignedEquipments/<int:commessa_id>/', GetAssignedEquipments.as_view(), name='get_assigned_equipments'),
    path('commesse/<int:commessa_id>/', RemoveEquipment.as_view(), name='remove_equipment'),
    path('preventivi/<int:pk>/', PreventivoDetailView.as_view(), name='preventivo-detail'),

    path('updateequipments/', UpdateEquipments.as_view(), name='update_equipments'),
    # path('update-clienti/', UpdateClienti.as_view(), name='update_clienti'),
    path('clienti/', Clienti.as_view(), name='clienti'),
    path('sync-clienti/', sync_clienti, name='sync_clienti'),
    path('prodotti/', ProductListView.as_view(), name='product-list'),
    path('prodotto/<int:id>/', get_prodotto, name='get_prodotto'),

    path('logged-in-user/', get_logged_in_user, name='logged_in_user'),

    path('presenza/', SetPresenza.as_view(), name='set_presenza'),
    path('userdata/', UserDataAPI.as_view(), name='user_data_api'),
    path('check-presenza-compilata/', CheckPresenzaCompilata.as_view(), name='check-presenza-compilata'),
    path('attivita-utente/<str:data>', AttivitaUtente.as_view(), name='attivita_utente'),
    path('commesse-utente/<str:selected_date>', CommessaViewSet.as_view({'get': 'get_commesseutente'}), name='commesseutente'),
    path('commessegiorno-utente/<str:selected_date>', CommessaGiornoViewSet.as_view({'get': 'get_commessegiornoutente'}), name='commessegiornoutente'),
    path('commessegiorno-selecteduser/<str:selected_date>/<int:user_id>', CommessaGiornoSelectedViewSet.as_view({'get': 'get_commessegiornoselecteduser'}), name='commessegiornoselecteduser'),
    path('addattrezzatura/', AddAttrezzatura.as_view(), name='add_attrezzatura'),
    path('editattrezzatura/<int:pk>/', EditAttrezzatura.as_view(), name='edit_attrezzatura'),
    path('commesse/<int:commessa_id>/attivita-completate/', AttivitaCompletateCommessaView.as_view(),name='attivita_completate_commessa'),
    path('create-ferie/', create_ferie),
    path('ferie-utente/<int:user_id>/', FerieUtenteView.as_view(), name='ferie_utente'),
    path('commesse/<int:commessa_id>/costo-operai/', CostoOperaiAPIView.as_view(), name='costo_operai'),
    path('commesse/<int:commessa_id>/costo-attrezzatura/', CostoAttrezzaturaAPIView.as_view(), name='costo_attrezzatura'),
    path('check-admin-group/', check_admin_group, name='check_admin_group'),
    path('ferie-requests/', FerieRequestsView.as_view(), name='ferie_requests'),
    path('approve-ferie/<int:pk>/', FerieApprovalView.as_view(), name='approve-ferie'),
    path('commesse/<int:commessa_id>/totale-attivita/', get_totale_attivita, name='get_totale_attivita'),
    path('preventivi/', Preventivi.as_view(), name='preventivi'),  # URL per i preventivi

    path('addoperators/', AddOperatorsView.as_view(), name='add_operators'),
    #path('api/updateoperatori/', UpdateOperatori.as_view(), name='update_operatori'),
    path('getAssignedOperators/<int:commessa_id>/<str:selected_date>/', GetAssignedOperators.as_view(), name='get_assigned_operators'),
    path('getUnassignedOperators/<int:commessa_id>/<str:selected_date>/', getUnassignedOperators.as_view(), name='get_unassigned_operators'),
    path('commessa_giorno/<int:commessa_id>/<str:selected_date>/remove-operator/', RemoveOperatorFromCommessaView.as_view(), name='remove_operator_from_commessa'),
    path('commesse-giorno/<str:selected_date>/', CommesseGiornoOnDate.as_view(), name='commesse_giorno_on_date'),
    path('recupera-attrezzatura/<str:idSelectedCommessa>/<str:selected_date>/', recupera_attrezzatura, name='recupera_attrezzatura'),
    path('recupera-operatori/<str:idSelectedCommessa>/<str:selected_date>/', recupera_operatori, name='recupera_operatori'),
    path('getAllAssignedOperators/<str:selected_date>/', GetAllAssignedOperators.as_view(), name='get_all_assigned_operators'),
    path('getAllUnassignedOperators/<str:selected_date>/', getAllUnassignedOperators.as_view(), name='get_all_assigned_operators'),

    path('updatetools/', UpdateTools.as_view(), name='update_tools'),
    path('getUnassignedTools/<int:commessa_id>/<str:selected_date>/', getUnassignedTools.as_view(), name='get_unassigned_tools'),
    path('GetAssignedTools/<int:commessa_id>/<str:selected_date>/', GetAssignedTools.as_view(), name='get_assigned_tools'),
    path('AllUnassignedTools/<str:selected_date>/', AllUnassignedTools.as_view(), name='all_assigned_tools'),
    path('commesse/<int:commessa_id>/<str:selected_date>/remove-equipment/', RemoveEquipment.as_view(), name='remove_equipment'),
    path('getAllAssignedTools/<str:selected_date>/', getAllAssignedTools.as_view(), name='get_all_assigned_tools'),

    path('deleteattrezzatura/<int:id>/', delete_attrezzatura, name='delete-attrezzatura'),
    path('createchecklist/', CreateChecklistView.as_view(), name='create-checklist'),
    path('createchecklistitem/', CreateCheckListItemView.as_view(), name='create_checklist_item'),
    path('delete-checklistitems/',delete_checklistitems, name='delete_checklistitems'),
    path('groups/', GroupListView.as_view(), name='group-list'),
    path('invia-segnalazioni/', invia_segnalazioni, name='invia_segnalazioni'),
    path('media/allegati/<str:filename>/', download_file, name='download_file'),
    path('notifiche-items/', notifiche_items, name='notifiche-items'),
    path('unread-notifiche-items/', unread_notifiche_items, name='unread_notifiche-items'),
    path('mark-notifica-as-viewed/<int:notifica_id>/', mark_notifica_as_viewed, name='mark_notifica_as_viewed'),
    path('completechecklistitemattivita/<int:pk>/', complete_checklist_item_attivita, name='complete_checklist_item_attivita'),
    path('checklistitemsattivitautente/', CheckListItemsAttivitaUtente.as_view(), name='checklist_items_attivita_utente'),
    path('django_info/', djangoinfo, name='django_info'),
    path('deletechecklist/<int:id>/', delete_checklist, name='delete_checklist'),
    path('getNavbarItems/', getNavbarItems, name ='getNavbarItems'),
    path('stampacontratto/<int:object_id>/', stampaContratto, name='theme.stampaContratto'),
    path('subscribe/', subscribe, name='subscribe'),
    path('vapid-public-key/',get_vapid_public_key, name='vapid_public_key'),

#api per lorenz*************************************** ci va l'id dell'attivita a cui voglio aggiungere il resume
    path('add-resume-to-activity/<int:activity_id>/',add_resume_to_activity, name='add_resume_to_activity')
    
]





    # path('groups/', group_list, name='group_list'),
