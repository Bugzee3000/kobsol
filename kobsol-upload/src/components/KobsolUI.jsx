import React, { useState, useEffect, useRef } from "react";
import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const DARK = {bg:"#080D1A",bgCard:"#0F1729",bgCardHover:"#162035",accent:"#00E5A0",accentDim:"#00b37d",accentGlow:"rgba(0,229,160,0.15)",gold:"#F5C842",goldDim:"#c9a030",text:"#E8EDF5",textMuted:"#5A6A88",textSoft:"#8A9AB8",border:"#1A2840",borderLight:"#243552",danger:"#FF4D6D",dangerDim:"#cc2244",dangerGlow:"rgba(255,77,109,0.15)",warning:"#FB923C",warningGlow:"rgba(251,146,60,0.15)",blue:"#4A90E2",purple:"#A78BFA"};
const LIGHT = {bg:"#F4F6FB",bgCard:"#FFFFFF",bgCardHover:"#EEF1F8",accent:"#00A372",accentDim:"#007a55",accentGlow:"rgba(0,163,114,0.12)",gold:"#B8860B",goldDim:"#8a6508",text:"#0F1729",textMuted:"#6B7A99",textSoft:"#8A9AB8",border:"#DDE3F0",borderLight:"#C8D0E4",danger:"#D63855",dangerDim:"#aa1c38",dangerGlow:"rgba(214,56,85,0.12)",warning:"#C2610A",warningGlow:"rgba(194,97,10,0.12)",blue:"#2563EB",purple:"#7C3AED"};
function getC(theme) { return theme === 'light' ? LIGHT : DARK; }
const MEMBER_COLORS = ["#00E5A0","#F5C842","#4A90E2","#FF6B9D","#A78BFA","#FB923C","#34D399","#60A5FA","#F87171","#FBBF24"];

const T = {
  fr: {
    welcome:"Bienvenue sur",tagline:"Une plateforme dédiée à suivre l'évolution de votre projet d'épargne en groupe facilement.",startBtn:"Démarrer votre projet",myTeams:"Mes projets",globalView:"Vue globale",newProject:"+ Nouveau projet",backToTeams:"← Retour aux projets",createProject:"Nouveau projet KOBSOL",createSub:"Configurez les paramètres du cycle",addMembers:"Membres du groupe",addMembersSub:"Ajoutez les participants",projectName:"Nom du projet",projectNamePh:"Ex: Groupe Famille 2025",amountPer:"Montant par personne ($)",startDate:"Date de début",depositPeriod:"Période de dépôt",weekly:"Hebdo",bimonthly:"Bi-mensuel",monthly:"Mensuel",yearly:"Annuel",country:"Pays d'origine",searchCountry:"Rechercher un pays...",memberName:"Nom membre",emailOptional:"Email (optionnel)",addMember:"+ Ajouter un membre",cancel:"Annuler",back:"← Retour",next:"Suivant →",create:"Créer le projet",summary:"Récapitulatif",members:"Membres",potPerCycle:"Pot par cycle",period:"Période",cyclesCompleted:"Cycles complétés",totalDistributed:"Total distribué",toDistribute:"Reste à distribuer",activeTeams:"Équipes actives",uniqueParticipants:"Participants uniques",allProjects:"Tous les projets",progress:"Progression",membersAndBeneficiaries:"Membres & Bénéficiaires",cycleSchedule:"Calendrier des cycles",member:"Membre",email:"Email",receptionDate:"Date réception",amountReceived:"Montant reçu",status:"Statut",received:"✓ Reçu",pending:"⏳ En attente",active:"Actif",completed:"Terminé",upcoming:"À venir",noProjects:"Aucun projet pour l'instant",noProjectsSub:"Créez votre premier cycle d'épargne collective",createFirst:"+ Créer un projet",reorderTitle:"Réorganiser l'ordre de réception",reorderSub:"Glissez les membres pour modifier l'ordre",reorderBtn:"Réorganiser l'ordre",saveOrder:"Enregistrer",cancelReorder:"Annuler",orderChanged:"Ordre des cycles mis à jour !",projectCreated:"Projet créé avec succès !",cycle:"Cycle",dragHint:"↕ Glisser pour réorganiser",statsDistributed:"Cycles passés — montant distribué",statsToDistribute:"Projets actifs — montant restant",overview:"Vue d'ensemble",overviewSub:"Statistiques globales",latePayments:"Retards de paiement",latePaymentsTab:"⚠️ Retards",markLate:"Marquer en retard",markPaid:"✓ Réglé",markLateTitle:"Signaler un retard",lateReason:"Raison du retard (optionnel)",lateReasonPh:"Ex: difficultés financières temporaires",lateDate:"Date limite accordée",confirmLate:"Confirmer le retard",noLates:"Aucun retard enregistré",noLatesSub:"Tous les membres sont à jour.",lateStatus:"En retard",resolvedStatus:"Réglé",lateDays:"j de retard",lateAlert:"⚠️ Retard signalé",lateResolved:"Retard résolu !",lateMarked:"Retard enregistré",memberLate:"en retard",membersLate:"en retard",lateSince:"Retard depuis",dueDate:"Échéance accordée",reason:"Raison",lateImpact:"Impact sur le cycle",lateImpactDesc:"Ce retard peut décaler les versements suivants.",confirmDeposit:"Confirmer le règlement",resolveConfirm:"Confirmer le règlement de ce retard ?",yes:"Oui, réglé",no:"Annuler",depositedOn:"Reçu le",latesCount:"retard(s) actif(s)",allOnTime:"Tous à jour ✓",paymentHistory:"Historique des paiements",signIn:"Connexion",signUp:"Inscription",signOut:"Déconnexion",authEmail:"Adresse email",authPassword:"Mot de passe",authName:"Votre nom complet",authNamePh:"Ex: Marie Dupont",authPasswordConfirm:"Confirmer le mot de passe",authForgot:"Mot de passe oublié ?",authResetTitle:"Réinitialisation",authResetSub:"Entrez votre email.",authResetSent:"Email envoyé ! Vérifiez votre boîte.",authSignInBtn:"Se connecter",authSignUpBtn:"Créer le compte",authBack:"← Retour",authNoAccount:"Pas de compte ?",authHaveAccount:"Déjà un compte ?",authDemo:"Accès démo (sans compte)",authSecure:"🔒 Vos projets sont privés et chiffrés.",authLoading:"Connexion…",authLoadingUp:"Création du compte…",authGreeting:"Bienvenue",authLoggedAs:"Connecté en tant que",authErrEmail:"Adresse email invalide.",authErrPwd:"Minimum 6 caractères.",authErrReq:"Ce champ est requis.",authErrMatch:"Les mots de passe ne correspondent pas.",authErrInvalid:"Email ou mot de passe incorrect.",profile:"Mon profil",profileSub:"Informations et préférences",profileSave:"Enregistrer",profileSaved:"Profil mis à jour !",profileEditName:"Modifier",profileDanger:"Zone de danger",profileSignOut:"Se déconnecter",profileDeleteAccount:"Supprimer le compte",profileDeleteWarning:"Action irréversible.",cycleHealth:"Santé du cycle",depositLate:"Dépôt en retard",depositPending:"Dépôt en attente",depositConfirmed:"Dépôt confirmé",flag:"Drapeau",code:"Code",
 inviteMembers:"Inviter des membres",inviteMembersSub:"Envoyez une invitation par courriel",inviteEmail:"Courriel du membre",inviteSend:"Envoyer l'invitation",inviteSent:"Invitation envoyée !",inviteError:"Courriel invalide ou déjà invité.",inviteTab:"📧 Invitations",invitePending:"En attente",inviteResend:"Renvoyer",inviteRevoke:"Révoquer",noInvites:"Aucune invitation en attente.", },
  en: {
    welcome:"Welcome to",tagline:"A platform dedicated to easily tracking the progress of your group savings project.",startBtn:"Start your project",myTeams:"My projects",globalView:"Global view",newProject:"+ New project",backToTeams:"← Back to projects",createProject:"New KOBSOL project",createSub:"Configure the cycle parameters",addMembers:"Group members",addMembersSub:"Add participants",projectName:"Project name",projectNamePh:"Ex: Family Group 2025",amountPer:"Amount per person ($)",startDate:"Start date",depositPeriod:"Deposit period",weekly:"Weekly",bimonthly:"Bi-monthly",monthly:"Monthly",yearly:"Yearly",country:"Country of origin",searchCountry:"Search a country...",memberName:"Member name",emailOptional:"Email (optional)",addMember:"+ Add a member",cancel:"Cancel",back:"← Back",next:"Next →",create:"Create project",summary:"Summary",members:"Members",potPerCycle:"Pot per cycle",period:"Period",cyclesCompleted:"Cycles completed",totalDistributed:"Total distributed",toDistribute:"Remaining to distribute",activeTeams:"Active teams",uniqueParticipants:"Unique participants",allProjects:"All projects",progress:"Progress",membersAndBeneficiaries:"Members & Beneficiaries",cycleSchedule:"Cycle schedule",member:"Member",email:"Email",receptionDate:"Reception date",amountReceived:"Amount received",status:"Status",received:"✓ Received",pending:"⏳ Pending",active:"Active",completed:"Completed",upcoming:"Upcoming",noProjects:"No projects yet",noProjectsSub:"Create your first collective savings cycle",createFirst:"+ Create a project",reorderTitle:"Reorder reception sequence",reorderSub:"Drag members to change cycle order",reorderBtn:"Reorder",saveOrder:"Save",cancelReorder:"Cancel",orderChanged:"Cycle order updated!",projectCreated:"Project created successfully!",cycle:"Cycle",dragHint:"↕ Drag to reorder",statsDistributed:"Past cycles — amount distributed",statsToDistribute:"Active projects — amount remaining",overview:"Overview",overviewSub:"Global statistics",latePayments:"Late payments",latePaymentsTab:"⚠️ Lates",markLate:"Mark as late",markPaid:"✓ Paid",markLateTitle:"Report a late payment",lateReason:"Reason (optional)",lateReasonPh:"Ex: temporary financial difficulties",lateDate:"Agreed deadline",confirmLate:"Confirm late",noLates:"No lates recorded",noLatesSub:"All members are up to date.",lateStatus:"Late",resolvedStatus:"Resolved",lateDays:"days late",lateAlert:"⚠️ Late reported",lateResolved:"Late resolved!",lateMarked:"Late recorded",memberLate:"late",membersLate:"late",lateSince:"Late since",dueDate:"Agreed deadline",reason:"Reason",lateImpact:"Cycle impact",lateImpactDesc:"This late may delay subsequent payments.",confirmDeposit:"Confirm payment",resolveConfirm:"Confirm resolution of this late?",yes:"Yes, resolved",no:"Cancel",depositedOn:"Received on",latesCount:"active late(s)",allOnTime:"All on time ✓",paymentHistory:"Payment history",signIn:"Sign in",signUp:"Sign up",signOut:"Sign out",authEmail:"Email address",authPassword:"Password",authName:"Your full name",authNamePh:"Ex: John Smith",authPasswordConfirm:"Confirm password",authForgot:"Forgot password?",authResetTitle:"Password reset",authResetSub:"Enter your email.",authResetSent:"Email sent! Check your inbox.",authSignInBtn:"Sign in",authSignUpBtn:"Create account",authBack:"← Back",authNoAccount:"No account?",authHaveAccount:"Already have an account?",authDemo:"Demo access (no account)",authSecure:"🔒 Your projects are private and encrypted.",authLoading:"Signing in…",authLoadingUp:"Creating account…",authGreeting:"Welcome",authLoggedAs:"Logged in as",authErrEmail:"Invalid email address.",authErrPwd:"Minimum 6 characters.",authErrReq:"This field is required.",authErrMatch:"Passwords don't match.",authErrInvalid:"Invalid email or password.",profile:"My profile",profileSub:"Information and preferences",profileSave:"Save",profileSaved:"Profile updated!",profileEditName:"Edit",profileDanger:"Danger zone",profileSignOut:"Sign out",profileDeleteAccount:"Delete account",profileDeleteWarning:"This action is irreversible.",cycleHealth:"Cycle health",depositLate:"Late deposit",depositPending:"Pending deposit",depositConfirmed:"Confirmed deposit",flag:"Flag",code:"Code",
 inviteMembers:"Invite members",inviteMembersSub:"Send an invitation by email",inviteEmail:"Member email",inviteSend:"Send invitation",inviteSent:"Invitation sent!",inviteError:"Invalid or already invited email.",inviteTab:"📧 Invitations",invitePending:"Pending",inviteResend:"Resend",inviteRevoke:"Revoke",noInvites:"No pending invitations.", },
  es: {
    welcome:"Bienvenido a",tagline:"Una plataforma dedicada a seguir fácilmente la evolución de su proyecto de ahorro grupal.",startBtn:"Iniciar su proyecto",myTeams:"Mis proyectos",globalView:"Vista global",newProject:"+ Nuevo proyecto",backToTeams:"← Volver a proyectos",createProject:"Nuevo proyecto KOBSOL",createSub:"Configure los parámetros del ciclo",addMembers:"Miembros del grupo",addMembersSub:"Añada los participantes",projectName:"Nombre del proyecto",projectNamePh:"Ej: Grupo Familia 2025",amountPer:"Monto por persona ($)",startDate:"Fecha de inicio",depositPeriod:"Período de depósito",weekly:"Semanal",bimonthly:"Quincenal",monthly:"Mensual",yearly:"Anual",country:"País de origen",searchCountry:"Buscar un país...",memberName:"Nombre del miembro",emailOptional:"Email (opcional)",addMember:"+ Añadir miembro",cancel:"Cancelar",back:"← Atrás",next:"Siguiente →",create:"Crear proyecto",summary:"Resumen",members:"Miembros",potPerCycle:"Bote por ciclo",period:"Período",cyclesCompleted:"Ciclos completados",totalDistributed:"Total distribuido",toDistribute:"Por distribuir",activeTeams:"Equipos activos",uniqueParticipants:"Participantes únicos",allProjects:"Todos los proyectos",progress:"Progreso",membersAndBeneficiaries:"Miembros y Beneficiarios",cycleSchedule:"Calendario de ciclos",member:"Miembro",email:"Email",receptionDate:"Fecha recepción",amountReceived:"Monto recibido",status:"Estado",received:"✓ Recibido",pending:"⏳ Pendiente",active:"Activo",completed:"Completado",upcoming:"Próximo",noProjects:"Sin proyectos aún",noProjectsSub:"Cree su primer ciclo de ahorro colectivo",createFirst:"+ Crear un proyecto",reorderTitle:"Reordenar secuencia",reorderSub:"Arrastre los miembros para cambiar el orden",reorderBtn:"Reordenar",saveOrder:"Guardar",cancelReorder:"Cancelar",orderChanged:"¡Orden actualizado!",projectCreated:"¡Proyecto creado con éxito!",cycle:"Ciclo",dragHint:"↕ Arrastrar para reordenar",statsDistributed:"Ciclos pasados — monto distribuido",statsToDistribute:"Proyectos activos — monto restante",overview:"Resumen general",overviewSub:"Estadísticas globales",latePayments:"Retrasos de pago",latePaymentsTab:"⚠️ Retrasos",markLate:"Marcar como tarde",markPaid:"✓ Pagado",markLateTitle:"Reportar retraso",lateReason:"Razón (opcional)",lateReasonPh:"Ej: dificultades financieras temporales",lateDate:"Fecha límite acordada",confirmLate:"Confirmar retraso",noLates:"Sin retrasos registrados",noLatesSub:"Todos los miembros están al día.",lateStatus:"En retraso",resolvedStatus:"Resuelto",lateDays:"días de retraso",lateAlert:"⚠️ Retraso reportado",lateResolved:"¡Retraso resuelto!",lateMarked:"Retraso registrado",memberLate:"en retraso",membersLate:"en retraso",lateSince:"Retraso desde",dueDate:"Fecha límite acordada",reason:"Razón",lateImpact:"Impacto en el ciclo",lateImpactDesc:"Este retraso puede retrasar pagos posteriores.",confirmDeposit:"Confirmar pago",resolveConfirm:"¿Confirmar resolución de este retraso?",yes:"Sí, resuelto",no:"Cancelar",depositedOn:"Recibido el",latesCount:"retraso(s) activo(s)",allOnTime:"Todos al día ✓",paymentHistory:"Historial de pagos",signIn:"Iniciar sesión",signUp:"Registrarse",signOut:"Cerrar sesión",authEmail:"Correo electrónico",authPassword:"Contraseña",authName:"Su nombre completo",authNamePh:"Ej: Juan García",authPasswordConfirm:"Confirmar contraseña",authForgot:"¿Olvidó su contraseña?",authResetTitle:"Restablecer contraseña",authResetSub:"Ingrese su email.",authResetSent:"¡Email enviado! Revise su bandeja.",authSignInBtn:"Iniciar sesión",authSignUpBtn:"Crear cuenta",authBack:"← Atrás",authNoAccount:"¿Sin cuenta?",authHaveAccount:"¿Ya tiene cuenta?",authDemo:"Acceso demo (sin cuenta)",authSecure:"🔒 Sus proyectos son privados y cifrados.",authLoading:"Iniciando sesión…",authLoadingUp:"Creando cuenta…",authGreeting:"Bienvenido",authLoggedAs:"Conectado como",authErrEmail:"Correo electrónico inválido.",authErrPwd:"Mínimo 6 caracteres.",authErrReq:"Este campo es obligatorio.",authErrMatch:"Las contraseñas no coinciden.",authErrInvalid:"Email o contraseña incorrectos.",profile:"Mi perfil",profileSub:"Información y preferencias",profileSave:"Guardar",profileSaved:"¡Perfil actualizado!",profileEditName:"Editar",profileDanger:"Zona de peligro",profileSignOut:"Cerrar sesión",profileDeleteAccount:"Eliminar cuenta",profileDeleteWarning:"Acción irreversible.",cycleHealth:"Salud del ciclo",depositLate:"Depósito tardío",depositPending:"Depósito pendiente",depositConfirmed:"Depósito confirmado",flag:"Bandera",code:"Código",
inviteMembers:"Invitar miembros",inviteMembersSub:"Envía una invitación por correo",inviteEmail:"Correo del miembro",inviteSend:"Enviar invitación",inviteSent:"¡Invitación enviada!",inviteError:"Correo inválido o ya invitado.",inviteTab:"📧 Invitaciones",invitePending:"Pendiente",inviteResend:"Reenviar",inviteRevoke:"Revocar",noInvites:"Sin invitaciones pendientes.",  },
};

const COUNTRIES = [{code:"AF",name:"Afghanistan",flag:"🇦🇫"},{code:"ZA",name:"Afrique du Sud",flag:"🇿🇦"},{code:"AL",name:"Albanie",flag:"🇦🇱"},{code:"DZ",name:"Algérie",flag:"🇩🇿"},{code:"DE",name:"Allemagne",flag:"🇩🇪"},{code:"SA",name:"Arabie Saoudite",flag:"🇸🇦"},{code:"AR",name:"Argentine",flag:"🇦🇷"},{code:"AU",name:"Australie",flag:"🇦🇺"},{code:"AT",name:"Autriche",flag:"🇦🇹"},{code:"BE",name:"Belgique",flag:"🇧🇪"},{code:"BJ",name:"Bénin",flag:"🇧🇯"},{code:"BO",name:"Bolivie",flag:"🇧🇴"},{code:"BR",name:"Brésil",flag:"🇧🇷"},{code:"BF",name:"Burkina Faso",flag:"🇧🇫"},{code:"BI",name:"Burundi",flag:"🇧🇮"},{code:"KH",name:"Cambodge",flag:"🇰🇭"},{code:"CM",name:"Cameroun",flag:"🇨🇲"},{code:"CA",name:"Canada",flag:"🇨🇦"},{code:"CV",name:"Cap-Vert",flag:"🇨🇻"},{code:"CL",name:"Chili",flag:"🇨🇱"},{code:"CN",name:"Chine",flag:"🇨🇳"},{code:"CO",name:"Colombie",flag:"🇨🇴"},{code:"CG",name:"Congo",flag:"🇨🇬"},{code:"CD",name:"Congo RD",flag:"🇨🇩"},{code:"KR",name:"Corée du Sud",flag:"🇰🇷"},{code:"CI",name:"Côte d'Ivoire",flag:"🇨🇮"},{code:"HR",name:"Croatie",flag:"🇭🇷"},{code:"CU",name:"Cuba",flag:"🇨🇺"},{code:"DK",name:"Danemark",flag:"🇩🇰"},{code:"EG",name:"Égypte",flag:"🇪🇬"},{code:"AE",name:"Émirats Arabes",flag:"🇦🇪"},{code:"ES",name:"Espagne",flag:"🇪🇸"},{code:"US",name:"États-Unis",flag:"🇺🇸"},{code:"ET",name:"Éthiopie",flag:"🇪🇹"},{code:"FI",name:"Finlande",flag:"🇫🇮"},{code:"FR",name:"France",flag:"🇫🇷"},{code:"GA",name:"Gabon",flag:"🇬🇦"},{code:"GM",name:"Gambie",flag:"🇬🇲"},{code:"GH",name:"Ghana",flag:"🇬🇭"},{code:"GN",name:"Guinée",flag:"🇬🇳"},{code:"GW",name:"Guinée-Bissau",flag:"🇬🇼"},{code:"HT",name:"Haïti",flag:"🇭🇹"},{code:"IN",name:"Inde",flag:"🇮🇳"},{code:"ID",name:"Indonésie",flag:"🇮🇩"},{code:"IQ",name:"Irak",flag:"🇮🇶"},{code:"IR",name:"Iran",flag:"🇮🇷"},{code:"IE",name:"Irlande",flag:"🇮🇪"},{code:"IL",name:"Israël",flag:"🇮🇱"},{code:"IT",name:"Italie",flag:"🇮🇹"},{code:"JM",name:"Jamaïque",flag:"🇯🇲"},{code:"JP",name:"Japon",flag:"🇯🇵"},{code:"JO",name:"Jordanie",flag:"🇯🇴"},{code:"KE",name:"Kenya",flag:"🇰🇪"},{code:"KW",name:"Koweït",flag:"🇰🇼"},{code:"LB",name:"Liban",flag:"🇱🇧"},{code:"LY",name:"Libye",flag:"🇱🇾"},{code:"MG",name:"Madagascar",flag:"🇲🇬"},{code:"MY",name:"Malaisie",flag:"🇲🇾"},{code:"ML",name:"Mali",flag:"🇲🇱"},{code:"MA",name:"Maroc",flag:"🇲🇦"},{code:"MR",name:"Mauritanie",flag:"🇲🇷"},{code:"MX",name:"Mexique",flag:"🇲🇽"},{code:"MZ",name:"Mozambique",flag:"🇲🇿"},{code:"NL",name:"Pays-Bas",flag:"🇳🇱"},{code:"NP",name:"Népal",flag:"🇳🇵"},{code:"NG",name:"Nigeria",flag:"🇳🇬"},{code:"NO",name:"Norvège",flag:"🇳🇴"},{code:"NZ",name:"Nouvelle-Zélande",flag:"🇳🇿"},{code:"UG",name:"Ouganda",flag:"🇺🇬"},{code:"PK",name:"Pakistan",flag:"🇵🇰"},{code:"PE",name:"Pérou",flag:"🇵🇪"},{code:"PH",name:"Philippines",flag:"🇵🇭"},{code:"PL",name:"Pologne",flag:"🇵🇱"},{code:"PT",name:"Portugal",flag:"🇵🇹"},{code:"QA",name:"Qatar",flag:"🇶🇦"},{code:"RO",name:"Roumanie",flag:"🇷🇴"},{code:"GB",name:"Royaume-Uni",flag:"🇬🇧"},{code:"RU",name:"Russie",flag:"🇷🇺"},{code:"RW",name:"Rwanda",flag:"🇷🇼"},{code:"SN",name:"Sénégal",flag:"🇸🇳"},{code:"SL",name:"Sierra Leone",flag:"🇸🇱"},{code:"SG",name:"Singapour",flag:"🇸🇬"},{code:"SO",name:"Somalie",flag:"🇸🇴"},{code:"SD",name:"Soudan",flag:"🇸🇩"},{code:"SE",name:"Suède",flag:"🇸🇪"},{code:"CH",name:"Suisse",flag:"🇨🇭"},{code:"TZ",name:"Tanzanie",flag:"🇹🇿"},{code:"TD",name:"Tchad",flag:"🇹🇩"},{code:"TH",name:"Thaïlande",flag:"🇹🇭"},{code:"TG",name:"Togo",flag:"🇹🇬"},{code:"TN",name:"Tunisie",flag:"🇹🇳"},{code:"TR",name:"Turquie",flag:"🇹🇷"},{code:"UY",name:"Uruguay",flag:"🇺🇾"},{code:"VE",name:"Venezuela",flag:"🇻🇪"},{code:"VN",name:"Viêt Nam",flag:"🇻🇳"},{code:"YE",name:"Yémen",flag:"🇾🇪"},{code:"ZM",name:"Zambie",flag:"🇿🇲"},{code:"ZW",name:"Zimbabwe",flag:"🇿🇼"}];

function genId() { return Math.random().toString(36).substr(2, 9); }
function fmoney(n) { return new Intl.NumberFormat('fr-CA',{style:'currency',currency:'CAD',maximumFractionDigits:0}).format(n); }
function fdate(d, lang) { if (!d) return '—'; return new Date(d).toLocaleDateString(lang==='en'?'en-CA':lang==='es'?'es-ES':'fr-CA',{day:'numeric',month:'short',year:'numeric'}); }
function getPL(code) { return COUNTRIES.find(c => c.code === code); }
function computeCycles(team) {
  const {members,amountPerPerson,period,startDate} = team;
  const pot = amountPerPerson * members.length;
  const days = {weekly:7,bimonthly:15,monthly:30,yearly:365}[period]||30;
  const today = new Date();
  return members.map((m,i) => {
    const d = new Date(startDate);
    d.setDate(d.getDate() + i*days);
    const isPast = d < today;
    return {member:m, date:d.toISOString().split('T')[0], amount:pot, index:i+1, isPast, isCurr:!isPast&&i===0};
  });
}
function getTeamStats(team) {
  const cycles = computeCycles(team);
  const today = new Date();
  const lates = team.lates||[];
  const activeLates = lates.filter(l=>!l.resolved);
  const pastCycles = cycles.filter(c=>new Date(c.date)<today);
  const futureCycles = cycles.filter(c=>new Date(c.date)>=today);
  const currentCycle = futureCycles[0]||null;
  const totalPot = team.amountPerPerson*team.members.length;
  const distributed = pastCycles.reduce((s,c)=>s+c.amount,0);
  const remaining = futureCycles.reduce((s,c)=>s+c.amount,0);
  const progressPct = cycles.length?Math.round((pastCycles.length/cycles.length)*100):0;
  return {cycles,pastCycles,futureCycles,currentCycle,totalPot,distributed,remaining,progressPct,lates,activeLates};
}

function makeCSS(theme) {
  const C = getC(theme);
  return `
*{box-sizing:border-box;margin:0;padding:0;}
body{background:${C.bg};color:${C.text};font-family:'Outfit',sans-serif;min-height:100vh;}
input,select,textarea{font-family:inherit;}
.btn{padding:10px 20px;border-radius:10px;border:none;cursor:pointer;font-family:inherit;font-size:14px;font-weight:600;transition:all .2s;display:inline-flex;align-items:center;gap:6px;}
.btn-p{background:${C.accent};color:#000;}.btn-p:hover{background:${C.accentDim};}
.btn-g{background:${C.border};color:${C.text};}.btn-g:hover{background:${C.borderLight};}
.btn-d{background:${C.dangerGlow};color:${C.danger};border:1px solid ${C.danger}33;}
.btn-sm{padding:7px 14px;font-size:13px;border-radius:8px;}
.btn-xs{padding:4px 10px;font-size:12px;border-radius:6px;}
.fi{width:100%;padding:11px 14px;border-radius:10px;background:${C.bg};border:1px solid ${C.border};color:${C.text};font-size:14px;margin-bottom:12px;outline:none;transition:border .2s;}
.fi:focus{border-color:${C.accent};}.fi::placeholder{color:${C.textMuted};}.fi-err{border-color:${C.danger}!important;}
.fg{margin-bottom:14px;}.fl{display:block;font-size:12px;color:${C.textMuted};margin-bottom:5px;font-weight:500;}
.app-nav{padding:13px 22px;background:${C.bgCard};border-bottom:1px solid ${C.border};display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:100;gap:12px;}
.nav-logo{font-weight:800;font-size:20px;background:linear-gradient(135deg,${C.accent},${C.gold});-webkit-background-clip:text;-webkit-text-fill-color:transparent;cursor:pointer;}
.nav-r{display:flex;align-items:center;gap:8px;flex-wrap:wrap;}
.nav-tabs{display:flex;gap:4px;background:${C.bg};padding:4px;border-radius:10px;border:1px solid ${C.border};}
.nav-tab{padding:6px 14px;border-radius:7px;border:none;cursor:pointer;font-family:inherit;font-size:13px;font-weight:500;color:${C.textMuted};background:transparent;transition:all .2s;}
.nav-tab.on{background:${C.bgCard};color:${C.text};border:1px solid ${C.border};}
.app-main{padding:24px;max-width:1200px;margin:0 auto;}
.pt{font-weight:800;font-size:26px;margin-bottom:4px;}
.ps{color:${C.textMuted};font-size:14px;margin-bottom:24px;}
.empty{text-align:center;padding:60px 20px;}.ei{font-size:48px;margin-bottom:12px;}.et{font-size:18px;font-weight:600;margin-bottom:6px;}.es{color:${C.textMuted};font-size:14px;margin-bottom:20px;}
.tg{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:16px;}
.tc{background:${C.bgCard};border:1px solid ${C.border};border-radius:16px;padding:20px;cursor:pointer;transition:all .25s;}
.tc:hover{border-color:${C.accent}44;transform:translateY(-2px);box-shadow:0 8px 32px rgba(0,0,0,.3);}
.tc-name{font-weight:700;font-size:16px;margin-bottom:12px;display:flex;align-items:center;justify-content:space-between;gap:8px;}
.tc-meta{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:12px;}
.tc-mi{background:${C.bg};border:1px solid ${C.border};border-radius:8px;padding:8px 10px;}
.tc-ml{font-size:10px;color:${C.textMuted};text-transform:uppercase;letter-spacing:.5px;}
.tc-mv{font-weight:700;font-size:15px;margin-top:2px;}
.pb{height:4px;background:${C.border};border-radius:2px;overflow:hidden;margin-bottom:10px;}
.pb-fill{height:100%;border-radius:2px;background:linear-gradient(90deg,${C.accent},${C.accentDim});transition:width .6s ease;}
.chips{display:flex;gap:4px;flex-wrap:wrap;}
.chip{font-size:11px;padding:3px 8px;border-radius:20px;background:${C.border};color:${C.textSoft};}
.sg2{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:20px;}
.sg3{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:20px;}
.sg4{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:20px;}
.sc{background:${C.bgCard};border:1px solid ${C.border};border-radius:14px;padding:18px;}
.sc-label{font-size:11px;color:${C.textMuted};text-transform:uppercase;letter-spacing:.5px;margin-bottom:6px;}
.sc-val{font-weight:800;font-size:28px;line-height:1;}.sc-sub{font-size:11px;color:${C.textMuted};margin-top:4px;}.sc-lbl{font-size:12px;color:${C.textMuted};margin-top:4px;}
.tw{overflow-x:auto;}
table{width:100%;border-collapse:collapse;}
th{padding:10px 14px;font-size:11px;color:${C.textMuted};text-transform:uppercase;letter-spacing:.5px;text-align:left;border-bottom:1px solid ${C.border};}
td{padding:11px 14px;font-size:13px;border-bottom:1px solid ${C.border}33;}
tr:last-child td{border-bottom:none;}tr:hover td{background:${C.bgCardHover};}
.back-btn{background:none;border:none;color:${C.textMuted};font-family:inherit;font-size:14px;cursor:pointer;padding:6px 0;margin-bottom:16px;display:flex;align-items:center;gap:6px;}
.back-btn:hover{color:${C.accent};}
.detail-hd{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:20px;flex-wrap:wrap;gap:12px;}
.detail-tabs{display:flex;gap:4px;background:${C.bg};padding:4px;border-radius:10px;border:1px solid ${C.border};flex-wrap:wrap;margin-bottom:20px;}
.detail-tab{padding:7px 14px;border-radius:7px;border:none;cursor:pointer;font-family:inherit;font-size:13px;font-weight:500;color:${C.textMuted};background:transparent;transition:all .2s;}
.detail-tab.on{background:${C.bgCard};color:${C.text};border:1px solid ${C.border};}
.cg{display:grid;grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:10px;}
.cc{background:${C.bgCard};border:1px solid ${C.border};border-radius:12px;padding:14px;transition:all .2s;}
.cc.done{border-color:${C.accent}44;background:${C.accentGlow};}
.cc.curr{border-color:${C.accent};box-shadow:0 0 0 2px ${C.accentGlow};}
.cc.late{border-color:${C.danger}44;background:${C.dangerGlow};}
.cc-num{font-weight:700;font-size:22px;margin-bottom:4px;}
.cc-name{font-size:12px;font-weight:500;margin-bottom:2px;}
.cc-date{font-size:11px;color:${C.textMuted};}
.cc-status{font-size:10px;margin-top:6px;padding:2px 8px;border-radius:20px;display:inline-block;}
.cc-status.done{background:${C.accentGlow};color:${C.accent};}
.cc-status.curr{background:${C.accentGlow};color:${C.accent};}
.cc-status.late{background:${C.dangerGlow};color:${C.danger};}
.cc-status.upcoming{background:${C.border};color:${C.textMuted};}
.ph{display:flex;gap:8px;margin-bottom:20px;}
.ph-item{height:6px;flex:1;border-radius:3px;background:${C.border};}
.ph-item.done{background:${C.accent};}.ph-item.curr{background:${C.gold};}.ph-item.late{background:${C.danger};}
.late-card{background:${C.bgCard};border:1px solid ${C.border};border-radius:12px;padding:16px;margin-bottom:10px;}
.late-card.active{border-color:${C.danger}44;background:${C.dangerGlow};}
.late-card.resolved{border-color:${C.accent}44;opacity:.7;}
.late-header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:10px;flex-wrap:wrap;gap:8px;}
.late-meta{display:flex;gap:16px;font-size:12px;color:${C.textMuted};flex-wrap:wrap;}
.late-actions{display:flex;gap:8px;margin-top:10px;flex-wrap:wrap;}
.late-badge{font-size:11px;padding:3px 10px;border-radius:20px;font-weight:600;}
.late-badge.active{background:${C.dangerGlow};color:${C.danger};}
.late-badge.resolved{background:${C.accentGlow};color:${C.accent};}
.modal-bg{position:fixed;inset:0;background:rgba(0,0,0,.6);backdrop-filter:blur(4px);z-index:200;display:flex;align-items:center;justify-content:center;padding:16px;}
.modal{background:${C.bgCard};border:1px solid ${C.border};border-radius:20px;padding:28px;width:100%;max-width:520px;max-height:90vh;overflow-y:auto;}
.modal-title{font-weight:700;font-size:18px;margin-bottom:6px;}
.modal-sub{font-size:13px;color:${C.textMuted};margin-bottom:20px;}
.mf{display:flex;gap:8px;margin-top:20px;justify-content:flex-end;}
.frow{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
.ri{display:flex;align-items:center;gap:12px;padding:10px 14px;background:${C.bg};border:1px solid ${C.border};border-radius:10px;margin-bottom:6px;cursor:grab;transition:all .2s;}
.ri:hover{border-color:${C.accent}44;}
.ri-num{width:28px;height:28px;border-radius:50%;background:${C.accent};color:#000;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:13px;flex-shrink:0;}
.ri-info{flex:1;}.ri-name{font-weight:500;font-size:14px;}.ri-dt{font-size:12px;color:${C.textMuted};margin-top:1px;}
.confirm-box{background:${C.dangerGlow};border:1px solid ${C.danger}33;border-radius:12px;padding:14px;margin-top:14px;}
.confirm-box-title{font-size:14px;color:${C.danger};font-weight:600;margin-bottom:10px;}
.confirm-btns{display:flex;gap:8px;}
.landing{min-height:100vh;display:flex;align-items:center;justify-content:center;background:radial-gradient(ellipse 80% 60% at 50% -10%,${C.accentGlow},transparent),${C.bg};position:relative;overflow:hidden;}
.lg-grid{position:absolute;inset:0;opacity:.03;background-image:linear-gradient(${C.accent} 1px,transparent 1px),linear-gradient(90deg,${C.accent} 1px,transparent 1px);background-size:50px 50px;}
.lg-glow{position:absolute;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,${C.accentGlow} 0%,transparent 70%);top:50%;left:50%;transform:translate(-50%,-60%);}
.lg-content{position:relative;z-index:2;text-align:center;max-width:680px;padding:24px;}
.lg-eyebrow{font-size:12px;color:${C.accent};letter-spacing:4px;text-transform:uppercase;margin-bottom:16px;background:${C.accent}15;border:1px solid ${C.accent}30;padding:4px 14px;border-radius:30px;display:inline-block;}
.lg-logo{font-weight:800;font-size:80px;letter-spacing:-3px;line-height:1;background:linear-gradient(135deg,${C.accent} 0%,${C.gold} 50%,${C.accent} 100%);background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;animation:shimmer 4s linear infinite;margin-bottom:16px;}
@keyframes shimmer{to{background-position:200% center;}}
.lg-tagline{font-size:17px;color:${C.textSoft};line-height:1.75;margin-bottom:48px;max-width:500px;margin-left:auto;margin-right:auto;}
.lg-btn{display:inline-flex;align-items:center;gap:12px;background:linear-gradient(135deg,${C.accent},${C.accentDim});color:#000;font-family:inherit;font-weight:700;font-size:17px;padding:18px 44px;border-radius:50px;border:none;cursor:pointer;transition:all .3s;margin-bottom:52px;}
.lg-btn:hover{transform:translateY(-3px);}
.lg-arrow{font-size:20px;transition:transform .3s;}.lg-btn:hover .lg-arrow{transform:translateX(5px);}
.lg-feats{display:flex;gap:32px;flex-wrap:wrap;justify-content:center;}
.lg-feat{text-align:center;}.lg-feat-icon{font-size:26px;margin-bottom:5px;}.lg-feat-lbl{font-size:12px;color:${C.textMuted};}
.lg-lang{position:absolute;top:20px;right:20px;z-index:10;}
.lg-theme{position:absolute;top:20px;left:20px;z-index:10;}
.auth-wrap{min-height:100vh;display:flex;background:${C.bg};}
.auth-left{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:60px 40px;position:relative;}
.auth-right{width:400px;flex-shrink:0;background:linear-gradient(160deg,${C.accentGlow},rgba(245,200,66,.05));border-left:1px solid ${C.border};display:flex;flex-direction:column;align-items:center;justify-content:center;padding:60px 40px;}
.auth-bg-grid{position:absolute;inset:0;opacity:.03;background-image:linear-gradient(${C.accent} 1px,transparent 1px),linear-gradient(90deg,${C.accent} 1px,transparent 1px);background-size:50px 50px;}
.auth-card{width:100%;max-width:420px;background:${C.bgCard};border:1px solid ${C.border};border-radius:24px;padding:40px;position:relative;z-index:2;}
.auth-logo{font-weight:800;font-size:32px;background:linear-gradient(135deg,${C.accent},${C.gold});-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:6px;text-align:center;}
.auth-tagline{font-size:12px;color:${C.textMuted};text-align:center;margin-bottom:28px;}
.auth-tabs{display:flex;gap:4px;background:${C.bg};padding:4px;border-radius:12px;border:1px solid ${C.border};margin-bottom:24px;}
.auth-tab{flex:1;padding:9px;border-radius:9px;border:none;cursor:pointer;font-family:inherit;font-size:13px;font-weight:600;transition:all .2s;color:${C.textMuted};background:transparent;text-align:center;}
.auth-tab.on{background:${C.bgCard};color:${C.text};border:1px solid ${C.border};}
.auth-or{display:flex;align-items:center;gap:10px;margin:16px 0;color:${C.textMuted};font-size:12px;}
.auth-or::before,.auth-or::after{content:'';flex:1;height:1px;background:${C.border};}
.auth-demo{width:100%;padding:11px;border-radius:10px;border:1px dashed ${C.border};background:transparent;color:${C.textMuted};font-family:inherit;font-size:13px;cursor:pointer;transition:all .2s;display:flex;align-items:center;justify-content:center;gap:6px;}
.auth-demo:hover{border-color:${C.accent};color:${C.accent};}
.auth-secure{display:flex;align-items:center;justify-content:center;gap:6px;font-size:12px;color:${C.textMuted};margin-top:16px;}
.auth-err{background:${C.dangerGlow};border:1px solid ${C.danger}33;border-radius:10px;padding:10px 14px;font-size:13px;color:${C.danger};margin-bottom:14px;}
.auth-success{background:${C.accentGlow};border:1px solid ${C.accent}33;border-radius:10px;padding:10px 14px;font-size:13px;color:${C.accent};margin-bottom:14px;}
.auth-link{background:none;border:none;color:${C.accent};font-family:inherit;font-size:13px;cursor:pointer;padding:0;text-decoration:underline;}
.auth-forgot{display:flex;justify-content:flex-end;margin-top:-6px;margin-bottom:10px;}
.auth-feats{display:flex;flex-direction:column;gap:12px;width:100%;}
.auth-feat{display:flex;align-items:flex-start;gap:12px;padding:14px;background:${C.bg};border:1px solid ${C.border};border-radius:12px;}
.auth-feat-icon{font-size:22px;flex-shrink:0;}
.auth-feat-title{font-weight:600;font-size:14px;margin-bottom:2px;}
.auth-feat-desc{font-size:12px;color:${C.textMuted};line-height:1.5;}
.auth-user-badge{display:flex;align-items:center;gap:8px;padding:8px 12px;background:${C.bg};border:1px solid ${C.border};border-radius:10px;cursor:pointer;}
.auth-user-badge:hover{border-color:${C.accent}44;}
.auth-user-avatar{width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,${C.accent},${C.accentDim});display:flex;align-items:center;justify-content:center;font-weight:700;font-size:12px;color:#000;flex-shrink:0;}
.auth-user-name{font-size:13px;font-weight:500;max-width:100px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.auth-user-email{font-size:11px;color:${C.textMuted};}
.theme-btn{background:${C.border};border:1px solid ${C.borderLight};color:${C.text};border-radius:8px;padding:7px 10px;cursor:pointer;font-size:16px;transition:all .2s;}
.lang-sw{display:flex;gap:3px;background:${C.bg};padding:3px;border-radius:8px;border:1px solid ${C.border};}
.lang-btn{padding:4px 8px;border-radius:5px;border:none;cursor:pointer;font-family:inherit;font-size:11px;font-weight:600;color:${C.textMuted};background:transparent;transition:all .2s;text-transform:uppercase;}
.lang-btn.on{background:${C.bgCard};color:${C.accent};border:1px solid ${C.border};}
.mob-nav{display:none;position:fixed;bottom:0;left:0;right:0;z-index:200;background:${C.bgCard};border-top:1px solid ${C.border};padding:8px 0;justify-content:space-around;align-items:center;}
.mob-nav-btn{display:flex;flex-direction:column;align-items:center;gap:3px;padding:6px 16px;border:none;background:transparent;cursor:pointer;color:${C.textMuted};font-family:inherit;font-size:10px;min-width:64px;}
.mob-nav-btn.on{color:${C.accent};}
.mob-nav-icon{font-size:20px;line-height:1;}
.mob-fab{position:fixed;bottom:76px;right:20px;z-index:201;width:52px;height:52px;border-radius:50%;background:${C.accent};border:none;cursor:pointer;display:none;align-items:center;justify-content:center;font-size:26px;color:#000;}
.toast{position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:${C.bgCard};border:1px solid ${C.border};border-radius:12px;padding:12px 20px;font-size:14px;font-weight:500;z-index:300;white-space:nowrap;box-shadow:0 8px 32px rgba(0,0,0,.3);animation:slideUp .3s ease;}
@keyframes slideUp{from{transform:translateX(-50%) translateY(20px);opacity:0;}to{transform:translateX(-50%) translateY(0);opacity:1;}}
.toast.warn{border-color:${C.warning}44;color:${C.warning};}
.cp-results{max-height:200px;overflow-y:auto;border:1px solid ${C.border};border-radius:10px;background:${C.bgCard};}
.cp-item{display:flex;align-items:center;gap:8px;padding:10px 14px;cursor:pointer;font-size:13px;transition:background .15s;}
.cp-item:hover{background:${C.bgCardHover};}
.cp-sel{padding:10px 14px;border-radius:10px;background:${C.bg};border:1px solid ${C.border};display:flex;align-items:center;gap:8px;cursor:pointer;font-size:13px;}
@media(max-width:768px){
  .app-main{padding:16px 14px 90px;}
  .app-nav{padding:10px 14px;}
  .app-nav .nav-tabs,.app-nav .btn-p{display:none;}
  .sg3,.sg4{grid-template-columns:1fr 1fr;}
  .sg2,.tg{grid-template-columns:1fr;}
  .lg-logo{font-size:52px;}
  .auth-right{display:none;}
  .auth-left{padding:30px 16px;}
  .auth-card{padding:24px 18px;}
  .detail-tabs{flex-wrap:wrap;}
  .modal{padding:22px 18px;border-radius:16px;}
  .mf{flex-direction:column-reverse;}.mf .btn{width:100%;}
  .frow{grid-template-columns:1fr;}
  .mob-nav{display:flex;}.mob-fab{display:flex;}
  .toast{left:14px;right:14px;bottom:80px;text-align:center;white-space:normal;}
}
@media(max-width:480px){.sg3,.sg4{grid-template-columns:1fr;}}
  
/* LANDING MARKETING */
.lm-wrap{min-height:100vh;background:${C.bg};overflow-x:hidden;}
.lm-nav{position:fixed;top:0;left:0;right:0;z-index:100;padding:14px 32px;display:flex;align-items:center;justify-content:space-between;background:${C.bg}cc;backdrop-filter:blur(20px);border-bottom:1px solid ${C.border};flex-wrap:wrap;gap:10px;}
.lm-nav-logo{font-family:'Syne',sans-serif;font-weight:800;font-size:22px;background:linear-gradient(135deg,${C.accent},${C.gold});-webkit-background-clip:text;-webkit-text-fill-color:transparent;}
.lm-nav-r{display:flex;align-items:center;gap:10px;flex-wrap:wrap;}
.lm-nav-cta{display:inline-flex;align-items:center;gap:7px;background:${C.accent};color:#000;font-family:'Outfit',sans-serif;font-weight:700;font-size:13px;padding:9px 20px;border-radius:50px;border:none;cursor:pointer;transition:all .25s;}
.lm-nav-cta:hover{background:${C.accentDim};transform:translateY(-1px);}
.lm-hero{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;background:radial-gradient(ellipse 80% 60% at 50% -10%,${C.accentGlow},transparent),${C.bg};position:relative;overflow:hidden;padding:120px 24px 80px;text-align:center;}
.lm-grid{position:absolute;inset:0;opacity:.03;background-image:linear-gradient(${C.accent} 1px,transparent 1px),linear-gradient(90deg,${C.accent} 1px,transparent 1px);background-size:60px 60px;pointer-events:none;}
.lm-glow{position:absolute;width:800px;height:800px;border-radius:50%;background:radial-gradient(circle,${C.accentGlow} 0%,transparent 70%);top:50%;left:50%;transform:translate(-50%,-60%);pointer-events:none;}
.lm-eyebrow{font-size:12px;color:${C.accent};letter-spacing:4px;text-transform:uppercase;background:${C.accentGlow};border:1px solid ${C.accent}30;padding:5px 16px;border-radius:30px;display:inline-block;margin-bottom:20px;}
.lm-logo{font-family:'Syne',sans-serif;font-weight:800;font-size:88px;letter-spacing:-4px;line-height:1;background:linear-gradient(135deg,${C.accent} 0%,${C.gold} 50%,${C.accent} 100%);background-size:200%;-webkit-background-clip:text;-webkit-text-fill-color:transparent;animation:lmShimmer 4s linear infinite;margin-bottom:20px;}
@keyframes lmShimmer{to{background-position:200% center;}}
.lm-tagline{font-size:18px;color:${C.textSoft};line-height:1.75;margin-bottom:16px;max-width:560px;}
.lm-sub{font-size:14px;color:${C.textMuted};margin-bottom:44px;}
.lm-cta-row{display:flex;gap:12px;align-items:center;justify-content:center;flex-wrap:wrap;margin-bottom:60px;}
.lm-cta-main{display:inline-flex;align-items:center;gap:12px;background:linear-gradient(135deg,${C.accent},${C.accentDim});color:#000;font-family:'Outfit',sans-serif;font-weight:700;font-size:17px;padding:18px 44px;border-radius:50px;border:none;cursor:pointer;transition:all .3s;box-shadow:0 0 40px ${C.accentGlow};}
.lm-cta-main:hover{transform:translateY(-3px);box-shadow:0 12px 48px ${C.accentGlow};}
.lm-cta-demo{display:inline-flex;align-items:center;gap:8px;background:transparent;color:${C.textMuted};font-family:'Outfit',sans-serif;font-size:14px;padding:16px 24px;border-radius:50px;border:1px solid ${C.border};cursor:pointer;transition:all .25s;}
.lm-cta-demo:hover{border-color:${C.accent}44;color:${C.text};}
.lm-stats{display:flex;gap:40px;justify-content:center;flex-wrap:wrap;}
.lm-stat{text-align:center;}
.lm-stat-val{font-family:'Syne',sans-serif;font-weight:800;font-size:36px;color:${C.accent};}
.lm-stat-lbl{font-size:12px;color:${C.textMuted};margin-top:4px;}
.lm-section{padding:80px 24px;max-width:1100px;margin:0 auto;}
.lm-section-eyebrow{font-size:11px;color:${C.accent};letter-spacing:3px;text-transform:uppercase;margin-bottom:10px;}
.lm-section-title{font-family:'Syne',sans-serif;font-weight:800;font-size:36px;margin-bottom:12px;}
.lm-section-sub{font-size:16px;color:${C.textMuted};max-width:520px;}
.lm-feats{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px;margin-top:40px;}
.lm-feat-card{background:${C.bgCard};border:1px solid ${C.border};border-radius:20px;padding:28px;transition:all .25s;position:relative;overflow:hidden;}
.lm-feat-card:hover{border-color:${C.accent}44;transform:translateY(-3px);}
.lm-feat-icon{font-size:32px;margin-bottom:14px;}
.lm-feat-title{font-family:'Syne',sans-serif;font-weight:700;font-size:16px;margin-bottom:8px;}
.lm-feat-desc{font-size:13px;color:${C.textMuted};line-height:1.7;}
.lm-steps{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:16px;margin-top:40px;}
.lm-step{background:${C.bgCard};border:1px solid ${C.border};border-radius:16px;padding:24px;text-align:center;}
.lm-step-num{width:44px;height:44px;border-radius:50%;background:${C.accentGlow};border:2px solid ${C.accent};color:${C.accent};font-family:'Syne',sans-serif;font-weight:800;font-size:18px;display:flex;align-items:center;justify-content:center;margin:0 auto 14px;}
.lm-step-title{font-weight:700;font-size:14px;margin-bottom:6px;}
.lm-step-desc{font-size:12px;color:${C.textMuted};line-height:1.6;}
.lm-testi{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px;margin-top:40px;}
.lm-testi-card{background:${C.bgCard};border:1px solid ${C.border};border-radius:20px;padding:24px;}
.lm-testi-text{font-size:14px;color:${C.textSoft};line-height:1.75;margin-bottom:16px;font-style:italic;}
.lm-testi-author{display:flex;align-items:center;gap:10px;}
.lm-testi-avatar{width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,${C.accent},${C.gold});display:flex;align-items:center;justify-content:center;font-weight:700;font-size:14px;color:#000;}
.lm-testi-name{font-weight:600;font-size:13px;}
.lm-testi-role{font-size:11px;color:${C.textMuted};}
.lm-faq{margin-top:40px;}
.lm-faq-item{border-bottom:1px solid ${C.border};}
.lm-faq-q{width:100%;background:none;border:none;color:${C.text};font-family:'Outfit',sans-serif;font-size:15px;font-weight:600;padding:18px 0;text-align:left;cursor:pointer;display:flex;justify-content:space-between;align-items:center;gap:12px;}
.lm-faq-a{font-size:14px;color:${C.textMuted};line-height:1.75;padding-bottom:16px;}
.lm-footer-cta{text-align:center;padding:80px 24px;background:radial-gradient(ellipse 60% 80% at 50% 100%,${C.accentGlow},transparent);}
.lm-footer-title{font-family:'Syne',sans-serif;font-weight:800;font-size:40px;margin-bottom:12px;}
.lm-footer-sub{font-size:16px;color:${C.textMuted};margin-bottom:36px;}
.lm-divider{height:1px;background:linear-gradient(90deg,transparent,${C.border},transparent);margin:0 auto;max-width:1100px;}
@media(max-width:768px){.lm-logo{font-size:52px;}.lm-nav{padding:12px 16px;}.lm-hero{padding:100px 16px 60px;}.lm-section{padding:60px 16px;}.lm-section-title{font-size:28px;}.lm-stats{gap:24px;}.lm-stat-val{font-size:28px;}}
`;
}

function Toast({msg,type,onDone}) {
  useEffect(()=>{const t=setTimeout(onDone,3200);return()=>clearTimeout(t);},[]);
  return <div className={`toast${type?' '+type:''}`}>{msg}</div>;
}
function ThemeToggle({theme,setTheme}) {
  return <button className="theme-btn" onClick={()=>setTheme(t=>t==='dark'?'light':'dark')}>{theme==='dark'?'☀️':'🌙'}</button>;
}
function LangSwitcher({lang,setLang}) {
  return <div className="lang-sw">{['fr','en','es'].map(l=><button key={l} className={`lang-btn${lang===l?' on':''}`} onClick={()=>setLang(l)}>{l}</button>)}</div>;
}
function CountryPicker({value,onChange,t}) {
  const [open,setOpen]=useState(false);
  const [q,setQ]=useState('');
  const sel=getPL(value);
  const filtered=COUNTRIES.filter(c=>c.name.toLowerCase().includes(q.toLowerCase())||c.code.toLowerCase().includes(q.toLowerCase()));
  return (
    <div style={{marginBottom:12}}>
      <div className="cp-sel" onClick={()=>setOpen(o=>!o)}>
        {sel?<>{sel.flag} {sel.name} ({sel.code})</>:<span style={{opacity:.5}}>{t.searchCountry}</span>}
        <span style={{marginLeft:'auto'}}>▾</span>
      </div>
      {open&&<div>
        <input className="fi" style={{marginBottom:6,marginTop:6}} placeholder={t.searchCountry} value={q} onChange={e=>setQ(e.target.value)} autoFocus/>
        <div className="cp-results">
          {filtered.map(c=><div key={c.code} className="cp-item" onClick={()=>{onChange(c.code);setOpen(false);setQ('');}}>{c.flag} {c.name} <span style={{opacity:.5}}>({c.code})</span></div>)}
        </div>
      </div>}
    </div>
  );
}
function MarkLateModal({member,team,onClose,onConfirm,t}) {
  const [reason,setReason]=useState('');
  const [dueDate,setDueDate]=useState('');
  useEffect(()=>{
    const s=getTeamStats(team);
    if(s.currentCycle) setDueDate(s.currentCycle.date);
    else{const d=new Date();d.setDate(d.getDate()+14);setDueDate(d.toISOString().split('T')[0]);}
  },[]);
  return (
    <div className="modal-bg" onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className="modal">
        <div className="modal-title">⚠️ {t.markLateTitle}</div>
        <div className="modal-sub">{member.name}</div>
        <div className="fg"><label className="fl">{t.lateReason}</label><input className="fi" placeholder={t.lateReasonPh} value={reason} onChange={e=>setReason(e.target.value)}/></div>
        <div className="fg"><label className="fl">{t.lateDate}</label><input className="fi" type="date" value={dueDate} onChange={e=>setDueDate(e.target.value)}/></div>
        <div className="mf"><button className="btn btn-g" onClick={onClose}>{t.cancel}</button><button className="btn btn-p" onClick={()=>onConfirm({reason,dueDate})}>{t.confirmLate}</button></div>
      </div>
    </div>
  );
}
function LatePaymentsPanel({team,onUpdate,t,lang,user,isOwner}) {
  const [markingMember,setMarkingMember]=useState(null);
  const [confirmResolve,setConfirmResolve]=useState(null);
  const lates=team.lates||[];
  const activeLates=lates.filter(l=>!l.resolved);
  const resolvedLates=lates.filter(l=>l.resolved);
  const getMemberName=id=>team.members.find(m=>m.id===id)?.name||'?';
  const handleConfirmLate=({reason,dueDate})=>{
    const late={id:genId(),memberId:markingMember.id,since:new Date().toISOString().split('T')[0],dueDate,reason,resolved:false};
    onUpdate({...team,lates:[...lates,late]},'lateMarked');
    setMarkingMember(null);
  };
  const handleResolve=lateId=>{
    const updated=lates.map(l=>l.id===lateId?{...l,resolved:true,resolvedAt:new Date().toISOString().split('T')[0]}:l);
    onUpdate({...team,lates:updated},'lateResolved');
    setConfirmResolve(null);
  };
  return (
    <div>
      {markingMember&&<MarkLateModal member={markingMember} team={team} onClose={()=>setMarkingMember(null)} onConfirm={handleConfirmLate} t={t}/>}
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16,flexWrap:'wrap',gap:8}}>
        <div>
          <div style={{fontWeight:700,fontSize:16}}>{t.latePayments}</div>
          <div style={{fontSize:13,color:'#5A6A88',marginTop:2}}>{activeLates.length>0?`${activeLates.length} ${t.latesCount}`:t.allOnTime}</div>
        </div>
      </div>
      {isOwner&&(
        <div style={{marginBottom:20}}>
          <div style={{fontSize:12,color:'#5A6A88',textTransform:'uppercase',letterSpacing:'.5px',marginBottom:10}}>{t.markLate}</div>
          <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
            {team.members.map(m=>{
              const hasLate=activeLates.some(l=>l.memberId===m.id);
              return <button key={m.id} className={`btn btn-sm ${hasLate?'btn-d':'btn-g'}`} onClick={()=>!hasLate&&setMarkingMember(m)} style={{opacity:hasLate?.6:1,cursor:hasLate?'default':'pointer'}}>{hasLate?'⚠️ ':''}{m.name}</button>;
            })}
          </div>
        </div>
      )}
      {activeLates.length===0&&resolvedLates.length===0&&(
        <div className="empty" style={{padding:'32px 20px'}}><div className="ei">✅</div><div className="et">{t.noLates}</div><div className="es">{t.noLatesSub}</div></div>
      )}
      {activeLates.map(l=>(
        <div key={l.id} className="late-card active">
          <div className="late-header">
            <div>
              <div style={{fontWeight:600,fontSize:15}}>{getMemberName(l.memberId)}</div>
              <div className="late-meta" style={{marginTop:4}}>
                <span>{t.lateSince}: {fdate(l.since,lang)}</span>
                <span>{t.dueDate}: {fdate(l.dueDate,lang)}</span>
                {l.reason&&<span>{t.reason}: {l.reason}</span>}
              </div>
            </div>
            <span className="late-badge active">{t.lateStatus}</span>
          </div>
          {isOwner&&(
            <div className="late-actions">
              <button className="btn btn-p btn-sm" onClick={()=>setConfirmResolve(l.id)}>{t.markPaid}</button>
            </div>
          )}
          {confirmResolve===l.id&&(
            <div className="confirm-box">
              <div className="confirm-box-title">{t.resolveConfirm}</div>
              <div className="confirm-btns"><button className="btn btn-p btn-sm" onClick={()=>handleResolve(l.id)}>{t.yes}</button><button className="btn btn-g btn-sm" onClick={()=>setConfirmResolve(null)}>{t.no}</button></div>
            </div>
          )}
        </div>
      ))}
      {resolvedLates.length>0&&(
        <div>
          <div style={{fontSize:12,color:'#5A6A88',textTransform:'uppercase',letterSpacing:'.5px',margin:'16px 0 10px'}}>{t.resolvedStatus}</div>
          {resolvedLates.map(l=>(
            <div key={l.id} className="late-card resolved">
              <div className="late-header">
                <div>
                  <div style={{fontWeight:600}}>{getMemberName(l.memberId)}</div>
                  <div className="late-meta" style={{marginTop:4}}><span>{t.lateSince}: {fdate(l.since,lang)}</span>{l.resolvedAt&&<span>{t.depositedOn}: {fdate(l.resolvedAt,lang)}</span>}</div>
                </div>
                <span className="late-badge resolved">{t.resolvedStatus}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
function ReorderModal({team,onClose,onSave,t,lang}) {
  const [order,setOrder]=useState([...team.members]);
  const dragRef=useRef(null);
  const cycles=computeCycles({...team,members:order});
  const handleDrop=i=>{
    if(dragRef.current===null||dragRef.current===i) return;
    const arr=[...order];
    const [item]=arr.splice(dragRef.current,1);
    arr.splice(i,0,item);
    setOrder(arr);
    dragRef.current=null;
  };
  return (
    <div className="modal-bg" onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className="modal">
        <div className="modal-title">{t.reorderTitle}</div>
        <div className="modal-sub">{t.reorderSub}</div>
        {order.map((m,i)=>{
          const cyc=cycles[i];
          return (
            <div key={m.id} className="ri" draggable onDragStart={()=>{dragRef.current=i;}} onDragOver={e=>e.preventDefault()} onDrop={()=>handleDrop(i)}>
              <div className="ri-num">{i+1}</div>
              <div className="ri-info"><div className="ri-name">{m.name}</div><div className="ri-dt">{fdate(cyc?.date,lang)} · {fmoney(cyc?.amount||0)}</div></div>
              <div style={{color:'#5A6A88',fontSize:18}}>⠿</div>
            </div>
          );
        })}
        <div style={{fontSize:12,color:'#5A6A88',textAlign:'center',marginBottom:16}}>{t.dragHint}</div>
        <div className="mf"><button className="btn btn-g" onClick={onClose}>{t.cancelReorder}</button><button className="btn btn-p" onClick={()=>onSave(order)}>{t.saveOrder}</button></div>
      </div>
    </div>
  );
}
function CreateModal({onClose,onCreate,t,lang}) {
  const [step,setStep]=useState(0);
  const [form,setForm]=useState({name:'',amountPerPerson:1000,period:'monthly',startDate:new Date().toISOString().split('T')[0],country:'CA'});
  const [members,setMembers]=useState([{id:genId(),name:'',email:''}]);
  const set=(k,v)=>setForm(f=>({...f,[k]:v}));
  const addMember=()=>setMembers(m=>[...m,{id:genId(),name:'',email:''}]);
  const updMember=(id,k,v)=>setMembers(m=>m.map(x=>x.id===id?{...x,[k]:v}:x));
  const remMember=id=>setMembers(m=>m.filter(x=>x.id!==id));
  const validMembers=members.filter(m=>m.name.trim());
  const pot=form.amountPerPerson*validMembers.length;
  const create=()=>{
    if(!form.name.trim()||validMembers.length<2) return;
    onCreate({id:genId(),...form,amountPerPerson:Number(form.amountPerPerson),members:validMembers,lates:[],createdAt:new Date().toISOString()});
  };
  return (
    <div className="modal-bg" onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className="modal">
        {step===0&&<>
          <div className="modal-title">{t.createProject}</div>
          <div className="modal-sub">{t.createSub}</div>
          <div className="fg"><label className="fl">{t.projectName}</label><input className="fi" placeholder={t.projectNamePh} value={form.name} onChange={e=>set('name',e.target.value)}/></div>
          <div className="fg"><label className="fl">{t.amountPer}</label><input className="fi" type="number" min="1" value={form.amountPerPerson} onChange={e=>set('amountPerPerson',e.target.value)}/></div>
          <div className="frow">
            <div className="fg"><label className="fl">{t.startDate}</label><input className="fi" type="date" value={form.startDate} onChange={e=>set('startDate',e.target.value)}/></div>
            <div className="fg"><label className="fl">{t.depositPeriod}</label><select className="fi" value={form.period} onChange={e=>set('period',e.target.value)}>{['weekly','bimonthly','monthly','yearly'].map(p=><option key={p} value={p}>{t[p]}</option>)}</select></div>
          </div>
          <div className="fg"><label className="fl">{t.country}</label><CountryPicker value={form.country} onChange={v=>set('country',v)} t={t}/></div>
          <div className="mf"><button className="btn btn-g" onClick={onClose}>{t.cancel}</button><button className="btn btn-p" onClick={()=>form.name.trim()&&setStep(1)}>{t.next}</button></div>
        </>}
        {step===1&&<>
          <div className="modal-title">{t.addMembers}</div>
          <div className="modal-sub">{t.addMembersSub}</div>
          {members.map((m,i)=>(
            <div key={m.id} style={{marginBottom:12,padding:'10px 12px',borderRadius:10,border:'1px solid var(--border, #1A2840)'}}>
              <div style={{display:'flex',gap:8,marginBottom:6}}>
                <input className="fi" style={{marginBottom:0,flex:1}} placeholder={`${t.memberName} ${i+1}`} value={m.name} onChange={e=>updMember(m.id,'name',e.target.value)}/>
                {members.length>1&&<button className="btn btn-g btn-sm" onClick={()=>remMember(m.id)}>✕</button>}
              </div>
              <input className="fi" style={{marginBottom:0,width:'100%'}} placeholder={t.emailOptional} value={m.email} onChange={e=>updMember(m.id,'email',e.target.value)}/>
            </div>
          ))}
          <button className="btn btn-g btn-sm" style={{marginBottom:16}} onClick={addMember}>{t.addMember}</button>
          <div className="mf"><button className="btn btn-g" onClick={()=>setStep(0)}>{t.back}</button><button className="btn btn-p" onClick={()=>validMembers.length>=2&&setStep(2)}>{t.next}</button></div>
        </>}
        {step===2&&<>
          <div className="modal-title">{t.summary}</div>
          <div className="sg2" style={{marginTop:16}}>
            <div className="sc"><div className="sc-label">{t.members}</div><div className="sc-val">{validMembers.length}</div></div>
            <div className="sc"><div className="sc-label">{t.potPerCycle}</div><div className="sc-val">{fmoney(pot)}</div></div>
          </div>
          <div className="sg2">
            <div className="sc"><div className="sc-label">{t.period}</div><div className="sc-val">{t[form.period]}</div></div>
            <div className="sc"><div className="sc-label">{t.startDate}</div><div className="sc-val" style={{fontSize:16}}>{fdate(form.startDate,lang)}</div></div>
          </div>
          <div className="mf"><button className="btn btn-g" onClick={()=>setStep(1)}>{t.back}</button><button className="btn btn-p" onClick={create}>{t.create}</button></div>
        </>}
      </div>
    </div>
  );
}
function TeamCard({team,onClick,t,lang}) {
  const stats=getTeamStats(team);
  const pl=getPL(team.country);
  const lates=stats.activeLates.length;
  return (
    <div className="tc" onClick={onClick}>
      <div className="tc-name">
        <span>{pl?.flag} {team.name}</span>
        {lates>0&&<span style={{fontSize:11,padding:'2px 8px',borderRadius:20,background:'rgba(255,77,109,.15)',color:'#FF4D6D'}}>⚠️ {lates}</span>}
      </div>
      <div className="tc-meta">
        <div className="tc-mi"><div className="tc-ml">{t.members}</div><div className="tc-mv">{team.members.length}</div></div>
        <div className="tc-mi"><div className="tc-ml">{t.potPerCycle}</div><div className="tc-mv">{fmoney(stats.totalPot)}</div></div>
        <div className="tc-mi"><div className="tc-ml">{t.period}</div><div className="tc-mv">{t[team.period]}</div></div>
        <div className="tc-mi"><div className="tc-ml">{t.cyclesCompleted}</div><div className="tc-mv">{stats.pastCycles.length}/{stats.cycles.length}</div></div>
      </div>
      <div className="pb"><div className="pb-fill" style={{width:stats.progressPct+'%'}}/></div>
      <div className="chips">
        <span className="chip">{stats.progressPct}% {t.progress}</span>
        {stats.currentCycle&&<span className="chip">→ {stats.currentCycle.member.name}</span>}
        {lates>0&&<span className="chip" style={{color:'#FB923C'}}>{lates} {t.memberLate}</span>}
      </div>
    </div>
  );
}
function TeamDetail({ team, onBack, onUpdate, t, lang, user }) {
  const [tab,setTab]=useState('overview');
  const [showReorder,setShowReorder]=useState(false);
  const stats=getTeamStats(team);
  const pl=getPL(team.country);
  const tabs=[{id:'overview',label:t.summary},{id:'schedule',label:t.cycleSchedule},{id:'members',label:t.membersAndBeneficiaries},{id:'lates',label:t.latePaymentsTab},{id:'invites',label:t.inviteTab}];
  const handleReorder=newMembers=>{onUpdate({...team,members:newMembers},'orderChanged');setShowReorder(false);};
 return (
    <div style={{position:'relative'}}>
      <div style={{position:'fixed',inset:0,backgroundImage:"url('https://images.unsplash.com/photo-1524863479829-916d8e77f114?w=1600&q=80')",backgroundSize:'cover',backgroundPosition:'center',opacity:.25,zIndex:-1,pointerEvents:'none'}}/>
      {showReorder&&<ReorderModal team={team} onClose={()=>setShowReorder(false)} onSave={handleReorder} t={t} lang={lang}/>}
      <button className="back-btn" onClick={onBack}>← {t.backToTeams}</button>
      <div className="detail-hd">
        <div>
          <h2 style={{fontWeight:800,fontSize:24}}>{pl?.flag} {team.name}</h2>
          <div style={{color:'#5A6A88',fontSize:13,marginTop:4}}>{pl?.name} · {t[team.period]} · {t.startDate}: {fdate(team.startDate,lang)}</div>
        </div>
      {team.admin_id===user?.id&&<button className="btn btn-g btn-sm" onClick={()=>setShowReorder(true)}>{t.reorderBtn}</button>}
      </div>
      <div className="detail-tabs">{tabs.map(tb=><button key={tb.id} className={`detail-tab${tab===tb.id?' on':''}`} onClick={()=>setTab(tb.id)}>{tb.label}</button>)}</div>
      {tab==='overview'&&<div>
        <div className="sg4">
          <div className="sc"><div className="sc-label">{t.members}</div><div className="sc-val">{team.members.length}</div></div>
          <div className="sc"><div className="sc-label">{t.potPerCycle}</div><div className="sc-val">{fmoney(stats.totalPot)}</div></div>
          <div className="sc"><div className="sc-label">{t.cyclesCompleted}</div><div className="sc-val">{stats.pastCycles.length}/{stats.cycles.length}</div></div>
          <div className="sc"><div className="sc-label">{t.progress}</div><div className="sc-val">{stats.progressPct}%</div></div>
        </div>
        <div className="sg2">
          <div className="sc"><div className="sc-label">{t.totalDistributed}</div><div className="sc-val">{fmoney(stats.distributed)}</div><div className="sc-sub">{t.statsDistributed}</div></div>
          <div className="sc"><div className="sc-label">{t.toDistribute}</div><div className="sc-val">{fmoney(stats.remaining)}</div><div className="sc-sub">{t.statsToDistribute}</div></div>
        </div>
        {stats.currentCycle&&<div className="sc" style={{marginBottom:20,borderColor:'#00E5A044'}}>
          <div className="sc-label">→ {t.cycle} {stats.currentCycle.index}</div>
          <div className="sc-val" style={{fontSize:18}}>{stats.currentCycle.member.name}</div>
          <div className="sc-sub">{fdate(stats.currentCycle.date,lang)} · {fmoney(stats.currentCycle.amount)}</div>
        </div>}
      </div>}
      {tab==='schedule'&&<div>
        <div className="ph">{stats.cycles.map((c,i)=>{
          const hasLate=stats.activeLates.some(l=>l.memberId===c.member.id);
          const cls=hasLate?'late':c.isPast?'done':c.isCurr?'curr':'';
          return <div key={i} className={`ph-item ${cls}`}/>;
        })}</div>
        <div className="cg">{stats.cycles.map((c,i)=>{
          const hasLate=stats.activeLates.some(l=>l.memberId===c.member.id);
          const s=hasLate?'late':c.isPast?'done':c.isCurr?'curr':'upcoming';
          const lbl=hasLate?t.lateStatus:c.isPast?t.received:c.isCurr?t.active:t.upcoming;
          return (
            <div key={i} className={`cc ${s}`}>
              <div className="cc-num" style={{color:MEMBER_COLORS[i%MEMBER_COLORS.length]}}>{c.index}</div>
              <div className="cc-name">{c.member.name}</div>
              <div className="cc-date">{fdate(c.date,lang)}</div>
              <div className="cc-date">{fmoney(c.amount)}</div>
              <div className={`cc-status ${s}`}>{lbl}</div>
            </div>
          );
        })}</div>
      </div>}
      {tab==='members'&&<div className="tw"><table><thead><tr><th>#</th><th>{t.member}</th><th>{t.email}</th><th>{t.receptionDate}</th><th>{t.amountReceived}</th><th>{t.status}</th></tr></thead><tbody>
        {stats.cycles.map((c,i)=>{
          const hasLate=stats.activeLates.some(l=>l.memberId===c.member.id);
          const lbl=hasLate?t.lateStatus:c.isPast?t.received:c.isCurr?t.active:t.upcoming;
          return <tr key={i}>
            <td><span style={{width:24,height:24,borderRadius:'50%',background:MEMBER_COLORS[i%MEMBER_COLORS.length],color:'#000',display:'inline-flex',alignItems:'center',justifyContent:'center',fontSize:11,fontWeight:700}}>{c.index}</span></td>
            <td style={{fontWeight:500}}>{c.member.name}</td>
            <td style={{color:'#5A6A88'}}>{c.member.email||'—'}</td>
            <td>{fdate(c.date,lang)}</td>
            <td style={{fontWeight:700}}>{fmoney(c.amount)}</td>
            <td><span style={{fontSize:11,padding:'3px 8px',borderRadius:20,background:hasLate?'rgba(255,77,109,.15)':c.isPast?'rgba(0,229,160,.15)':'rgba(90,106,136,.15)',color:hasLate?'#FF4D6D':c.isPast?'#00E5A0':'#5A6A88'}}>{lbl}</span></td>
          </tr>;
        })}
      </tbody></table></div>}
     {tab==='lates'&&<LatePaymentsPanel team={team} onUpdate={onUpdate} t={t} lang={lang} user={user} isOwner={team.admin_id===user?.id}/>}
     {tab === 'invites' && <InvitePanel team={team} t={t} user={user} />}
    </div>
  );
}
function GlobalView({teams,t,lang}) {
  const allStats=teams.map(team=>({team,stats:getTeamStats(team)}));
  const totalDistributed=allStats.reduce((s,{stats})=>s+stats.distributed,0);
  const totalRemaining=allStats.reduce((s,{stats})=>s+stats.remaining,0);
  const uniqueParticipants=new Set(teams.flatMap(tm=>tm.members.map(m=>m.email||m.name))).size;
  const totalLates=teams.reduce((s,tm)=>s+(tm.lates||[]).filter(l=>!l.resolved).length,0);
  return (
    <div>
      <div className="sg4">
        <div className="sc"><div className="sc-label">{t.allProjects}</div><div className="sc-val">{teams.length}</div></div>
        <div className="sc"><div className="sc-label">{t.uniqueParticipants}</div><div className="sc-val">{uniqueParticipants}</div></div>
        <div className="sc"><div className="sc-label">{t.totalDistributed}</div><div className="sc-val">{fmoney(totalDistributed)}</div></div>
        <div className="sc"><div className="sc-label">{t.toDistribute}</div><div className="sc-val">{fmoney(totalRemaining)}</div></div>
      </div>
      {totalLates>0&&<div className="sc" style={{marginBottom:20,borderColor:'rgba(255,77,109,.4)'}}>
        <div className="sc-label">⚠️ {t.latePayments}</div>
        <div className="sc-val" style={{color:'#FF4D6D'}}>{totalLates}</div>
        <div className="sc-lbl">{t.latesCount}</div>
      </div>}
      <div style={{display:'flex',flexDirection:'column',gap:12}}>
        {allStats.map(({team,stats})=>{
          const pl=getPL(team.country);
          const lates=stats.activeLates.length;
          return (
            <div key={team.id} className="sc">
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:12,flexWrap:'wrap',gap:8}}>
                <div>
                  <div style={{fontWeight:700}}>{pl?.flag} {team.name}</div>
                  <div style={{fontSize:12,color:'#5A6A88',marginTop:2}}>{team.members.length} {t.members} · {t[team.period]}</div>
                </div>
                <div style={{textAlign:'right'}}>
                  <div style={{fontWeight:700}}>{stats.progressPct}%</div>
                  {lates>0&&<div style={{fontSize:11,color:'#FF4D6D',marginTop:2}}>⚠️ {lates} {t.memberLate}</div>}
                </div>
              </div>
              <div className="pb"><div className="pb-fill" style={{width:stats.progressPct+'%'}}/></div>
              <div style={{display:'flex',justifyContent:'space-between',fontSize:12,color:'#5A6A88'}}>
                <span>{fmoney(stats.distributed)} {t.received}</span>
                <span>{fmoney(stats.remaining)} {t.pending}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
function AuthScreen({onAuth,onDemo,lang,setLang,theme,setTheme}) {
  const t=T[lang];
  const CSS=makeCSS(theme);
  const [mode,setMode]=useState('login');
  const [form,setFormState]=useState({name:'',email:'',password:'',confirm:''});
  const [errors,setErrors]=useState({});
  const [globalErr,setGlobalErr]=useState('');
  const [success,setSuccess]=useState('');
  const [loading,setLoading]=useState(false);
  const set=(k,v)=>{setFormState(f=>({...f,[k]:v}));setErrors(e=>({...e,[k]:''}));setGlobalErr('');};
  const validate=()=>{
    const errs={};
    if(!form.email) errs.email=t.authErrReq;
    else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email=t.authErrEmail;
    if(mode!=='reset'){if(!form.password) errs.password=t.authErrReq;else if(form.password.length<6) errs.password=t.authErrPwd;}
    if(mode==='register'){if(!form.name) errs.name=t.authErrReq;if(form.confirm!==form.password) errs.confirm=t.authErrMatch;}
    setErrors(errs);
    return Object.keys(errs).length===0;
  };
  const handleSubmit=async()=>{
    if(!validate()) return;
    setLoading(true);
    try {
      if(mode==='reset'){
        const {error}=await supabase.auth.resetPasswordForEmail(form.email,{redirectTo:window.location.origin+'/auth/callback'});
        if(error) setGlobalErr(error.message);
        else setSuccess(t.authResetSent);
      } else if(mode==='register'){
        const {error}=await supabase.auth.signUp({email:form.email,password:form.password,options:{data:{name:form.name}}});
        if(error) setGlobalErr(error.message);
        else setSuccess('Compte créé ! Vérifiez votre email pour confirmer.');
      } else {
        const {data,error}=await supabase.auth.signInWithPassword({email:form.email,password:form.password});
        if(error) setGlobalErr(t.authErrInvalid);
        else onAuth({name:data.user.user_metadata?.name||form.email.split('@')[0],email:data.user.email});
      }
    } catch(e){ setGlobalErr(e.message); }
    setLoading(false);
  };
  const features=[
    {icon:'🔒',title:lang==='fr'?'Projets 100% privés':lang==='en'?'100% private projects':'Proyectos 100% privados',desc:lang==='fr'?'Chaque utilisateur accède uniquement à ses données.':lang==='en'?'Each user accesses only their data.':'Cada usuario accede solo a sus datos.'},
    {icon:'🤝',title:lang==='fr'?'Gestion simplifiée':lang==='en'?'Simplified management':'Gestión simplificada',desc:lang==='fr'?'Cycles, membres et retards en un seul endroit.':lang==='en'?'Cycles, members and lates in one place.':'Ciclos, miembros y atrasos en un solo lugar.'},
    {icon:'🌍',title:lang==='fr'?'Multilingue':lang==='en'?'Multilingual':'Multilingüe',desc:lang==='fr'?'Disponible en français, anglais et espagnol.':lang==='en'?'Available in French, English and Spanish.':'Disponible en francés, inglés y español.'},
  ];
  return (
    <div className="auth-wrap" style={{position:'relative',overflow:'hidden'}}>
      <style>{CSS}</style>
      <div style={{position:'absolute',inset:0,backgroundImage:"url('https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1600&q=80')",backgroundSize:'cover',backgroundPosition:'center',opacity:.25,zIndex:0}}/>
      <div className="auth-bg-grid"/>
      <div className="auth-left">
        <div style={{position:'absolute',top:24,right:28,zIndex:10,display:'flex',gap:8}}>
          <ThemeToggle theme={theme} setTheme={setTheme}/>
          <LangSwitcher lang={lang} setLang={setLang}/>
        </div>
        <div className="auth-card">
          <div className="auth-logo">KOB.SOL</div>
          <div className="auth-tagline">✦ Épargne collective ✦</div>
          {mode!=='reset'&&<div className="auth-tabs">
            <button className={`auth-tab${mode==='login'?' on':''}`} onClick={()=>{setMode('login');setErrors({});setGlobalErr('');setSuccess('');}}>{t.signIn}</button>
            <button className={`auth-tab${mode==='register'?' on':''}`} onClick={()=>{setMode('register');setErrors({});setGlobalErr('');setSuccess('');}}>{t.signUp}</button>
          </div>}
          {mode==='reset'&&<div style={{marginBottom:16}}><div style={{fontWeight:700,marginBottom:4}}>{t.authResetTitle}</div><div style={{fontSize:13,color:'#5A6A88'}}>{t.authResetSub}</div></div>}
          {globalErr&&<div className="auth-err">{globalErr}</div>}
          {success&&<div className="auth-success">{success}</div>}
          {mode==='register'&&<div className="fg"><label className="fl">{t.authName}</label><input className={`fi${errors.name?' fi-err':''}`} placeholder={t.authNamePh} value={form.name} onChange={e=>set('name',e.target.value)}/>{errors.name&&<div style={{fontSize:12,color:'#FF4D6D',marginTop:-8,marginBottom:8}}>{errors.name}</div>}</div>}
          <div className="fg"><label className="fl">{t.authEmail}</label><input className={`fi${errors.email?' fi-err':''}`} type="email" placeholder="email@exemple.com" value={form.email} onChange={e=>set('email',e.target.value)} onKeyDown={e=>e.key==='Enter'&&handleSubmit()}/>{errors.email&&<div style={{fontSize:12,color:'#FF4D6D',marginTop:-8,marginBottom:8}}>{errors.email}</div>}</div>
          {mode!=='reset'&&<div className="fg"><label className="fl">{t.authPassword}</label><input className={`fi${errors.password?' fi-err':''}`} type="password" placeholder="••••••••" value={form.password} onChange={e=>set('password',e.target.value)} onKeyDown={e=>e.key==='Enter'&&handleSubmit()}/>{errors.password&&<div style={{fontSize:12,color:'#FF4D6D',marginTop:-8,marginBottom:8}}>{errors.password}</div>}</div>}
          {mode==='register'&&<div className="fg"><label className="fl">{t.authPasswordConfirm}</label><input className={`fi${errors.confirm?' fi-err':''}`} type="password" placeholder="••••••••" value={form.confirm} onChange={e=>set('confirm',e.target.value)}/>{errors.confirm&&<div style={{fontSize:12,color:'#FF4D6D',marginTop:-8,marginBottom:8}}>{errors.confirm}</div>}</div>}
          {mode==='login'&&<div className="auth-forgot"><button className="auth-link" onClick={()=>{setMode('reset');setErrors({});setGlobalErr('');setSuccess('');}}>{t.authForgot}</button></div>}
          {mode==='reset'&&<div className="auth-forgot"><button className="auth-link" onClick={()=>{setMode('login');setErrors({});setGlobalErr('');setSuccess('');}}>{t.authBack}</button></div>}
          <button className="btn btn-p" style={{width:'100%',justifyContent:'center',marginBottom:12}} onClick={handleSubmit} disabled={loading}>
            {loading?(mode==='register'?t.authLoadingUp:t.authLoading):mode==='register'?t.authSignUpBtn:t.authSignInBtn}
          </button>
          <div className="auth-or">ou</div>
          <button className="auth-demo" onClick={onDemo}>🎭 {t.authDemo}</button>
          <div className="auth-secure">{t.authSecure}</div>
        </div>
      </div>
      <div className="auth-right">
        <div style={{fontWeight:800,fontSize:28,marginBottom:8,background:'linear-gradient(135deg,#00E5A0,#F5C842)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>KOB.SOL</div>
        <div style={{color:'#5A6A88',fontSize:13,marginBottom:32,textAlign:'center'}}>✦ Épargne collective ✦</div>
        <div className="auth-feats">{features.map((f,i)=><div key={i} className="auth-feat"><div className="auth-feat-icon">{f.icon}</div><div><div className="auth-feat-title">{f.title}</div><div className="auth-feat-desc">{f.desc}</div></div></div>)}</div>
      </div>
    </div>
  );
}
function ProfilePage({user,setUser,onSignOut,t,lang,setLang,theme,setTheme}) {
  const [editing,setEditing]=useState(false);
  const [name,setName]=useState(user?.name||'');
  const [saved,setSaved]=useState(false);
  const C=getC(theme);
  const ini=n=>n?n.split(' ').map(w=>w[0]).join('').toUpperCase().slice(0,2):'?';
  const save=()=>{if(!name.trim()) return;setUser(u=>({...u,name:name.trim()}));setEditing(false);setSaved(true);setTimeout(()=>setSaved(false),2500);};
  const card={background:C.bgCard,border:`1px solid ${C.border}`,borderRadius:16,padding:22,marginBottom:12};
  const isSuperAdmin = user?.email === 'jrdivers@outlook.com';
const [adminStats, setAdminStats] = useState(null);
const [loadingStats, setLoadingStats] = useState(false);

useEffect(()=>{
  if(!isSuperAdmin) return;
  setLoadingStats(true);
  supabase.from('admin_dashboard').select('*').single()
    .then(({data})=>{
      setAdminStats(data);
      setLoadingStats(false);
    });
},[isSuperAdmin]);
  return (
    <div style={{maxWidth:620,margin:'0 auto',padding:'0 8px'}}>
      <div className="pt">{t.profile}</div>
      {saved&&<div style={{background:C.accentGlow,border:`1px solid ${C.accent}33`,borderRadius:10,padding:'10px 16px',fontSize:13,color:C.accent,marginBottom:14}}>✓ {t.profileSaved}</div>}
      <div style={{...card,display:'flex',alignItems:'center',gap:20,flexWrap:'wrap'}}>
        <div style={{width:70,height:70,borderRadius:'50%',background:`linear-gradient(135deg,${C.accent},${C.accentDim})`,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontSize:26,color:'#000',flexShrink:0}}>{ini(user?.name||'')}</div>
        <div style={{flex:1}}>
          {editing?(
            <div style={{display:'flex',gap:8,alignItems:'center',flexWrap:'wrap'}}>
              <input className="fi" style={{marginBottom:0,maxWidth:220}} value={name} onChange={e=>setName(e.target.value)} onKeyDown={e=>{if(e.key==='Enter') save();if(e.key==='Escape') setEditing(false);}} autoFocus/>
              <button className="btn btn-p btn-sm" onClick={save}>{t.profileSave}</button>
              <button className="btn btn-g btn-sm" onClick={()=>setEditing(false)}>✕</button>
            </div>
          ):(
            <div style={{display:'flex',alignItems:'center',gap:8,flexWrap:'wrap'}}>
              <span style={{fontWeight:700,fontSize:20}}>{user?.name}</span>
              <button className="btn btn-g btn-xs" onClick={()=>{setName(user?.name||'');setEditing(true);}}>✏️ {t.profileEditName}</button>
            </div>
          )}
          <div style={{color:C.textMuted,fontSize:13,marginTop:4}}>{user?.email}</div>
        </div>
      </div>
      <div style={card}>
        <div style={{fontWeight:700,marginBottom:14}}>⚙️ Préférences</div>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',paddingBottom:12,borderBottom:`1px solid ${C.border}`,marginBottom:12}}>
          <span style={{fontSize:14}}>Langue</span><LangSwitcher lang={lang} setLang={setLang}/>
        </div>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <span style={{fontSize:14}}>Thème</span><ThemeToggle theme={theme} setTheme={setTheme}/>
        </div>
      </div>
      <div style={{...card,borderColor:`${C.danger}44`}}>
        <div style={{fontWeight:700,marginBottom:12,color:C.danger}}>⚠️ {t.profileDanger}</div>
        <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
          <button className="btn btn-g btn-sm" onClick={onSignOut}>{t.profileSignOut}</button>
          <button className="btn btn-d btn-sm" onClick={()=>alert(t.profileDeleteWarning)}>{t.profileDeleteAccount}</button>
        </div>

      {isSuperAdmin&&(
          <div style={{...card,border:'1px solid rgba(0,229,160,.3)',marginTop:24}}>
            <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:20}}>
              <span style={{fontSize:20}}>⚡</span>
              <div style={{fontWeight:700,fontSize:16,color:'#00E5A0'}}>Super Admin — Stats KOB.SOL</div>
            </div>
            {loadingStats?(
              <div style={{color:'#5A6A88',fontSize:13}}>Chargement des stats...</div>
            ):adminStats?(
              <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(160px,1fr))',gap:12}}>
                {[
                  {icon:'📁',label:'Projets total',val:adminStats.total_projects},
                  {icon:'👥',label:'Membres total',val:adminStats.total_members},
                  {icon:'👤',label:'Utilisateurs',val:adminStats.total_users},
                  {icon:'🆕',label:'Nouveaux (7j)',val:adminStats.new_users_7days},
                  {icon:'⚠️',label:'Retards actifs',val:adminStats.active_lates},
                  {icon:'📊',label:'Retards total',val:adminStats.total_lates},
                  {icon:'💰',label:'Valeur totale',val:'$'+Number(adminStats.total_to_distribute||0).toLocaleString()},
                ].map((s,i)=>(
                  <div key={i} style={{background:'#080D1A',border:'1px solid #1A2840',borderRadius:12,padding:'14px 16px'}}>
                    <div style={{fontSize:20,marginBottom:6}}>{s.icon}</div>
                    <div style={{fontSize:11,color:'#5A6A88',textTransform:'uppercase',letterSpacing:'.5px',marginBottom:4}}>{s.label}</div>
                    <div style={{fontSize:22,fontWeight:800,color:'#E8EDF5'}}>{s.val}</div>
                  </div>
               
          
            ):null}
    </div>
  ); // 
} //
function MobileNav({page,setPage,setSel,onNew,t,showFab}) {
  const tabs=[{id:'teams',icon:'🏠',label:t.myTeams},{id:'global',icon:'📊',label:t.globalView},{id:'profile',icon:'👤',label:t.profile}];
  return (
    <>
      <nav className="mob-nav">{tabs.map(tab=><button key={tab.id} className={`mob-nav-btn${page===tab.id?' on':''}`} onClick={()=>{setPage(tab.id);setSel(null);}}><span className="mob-nav-icon">{tab.icon}</span><span>{tab.label}</span></button>)}</nav>
      {showFab!==false&&<button className="mob-fab" onClick={onNew}>＋</button>}
    </>
  );
}






function Landing({onStart,onDemo,onMyProjects,lang,setLang,theme,setTheme}){
  const t=T[lang];
  const CSS=makeCSS(theme);
  const [currentImg,setCurrentImg]=useState(0);
  const [fade,setFade]=useState(true);
  const [faqOpen,setFaqOpen]=useState(null);
  const [count,setCount]=useState({users:0,cycles:0,amount:0});
  const fr=lang==='fr',en=lang==='en';

  const images=[
    {url:"https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1600&q=80",label:fr?"Voyages de rêve":en?"Dream travels":"Viajes"},
    {url:"https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&q=80",label:fr?"Belle propriété":en?"Beautiful home":"Propiedad"},
    {url:"https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1600&q=80",label:fr?"Moments en famille":en?"Family moments":"Familia"},
    {url:"https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1600&q=80",label:fr?"Aventures":en?"Adventures":"Aventuras"},
    {url:"https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1600&q=80",label:fr?"Voiture de rêve":en?"Dream car":"Auto"},
    {url:"https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=1600&q=80",label:fr?"Vacances":en?"Vacations":"Vacaciones"},
  ];

  useEffect(()=>{
    const targets={users:12400,cycles:3200,amount:8700000};
    const dur=1800,start=Date.now();
    const tick=()=>{
      const p=Math.min((Date.now()-start)/dur,1),ease=1-Math.pow(1-p,3);
      setCount({users:Math.floor(targets.users*ease),cycles:Math.floor(targets.cycles*ease),amount:Math.floor(targets.amount*ease)});
      if(p<1) requestAnimationFrame(tick);
    };
    setTimeout(()=>requestAnimationFrame(tick),400);
  },[]);

  useEffect(()=>{
    const iv=setInterval(()=>{
      setFade(false);
      setTimeout(()=>{setCurrentImg(i=>(i+1)%images.length);setFade(true);},600);
    },5000);
    return()=>clearInterval(iv);
  },[]);

  const fmtNum=n=>n>=1000000?`${(n/1000000).toFixed(1)}M`:n>=1000?`${(n/1000).toFixed(1)}k`:""+n;

  const faqs=[
    {q:fr?"C'est quoi une tontine ?":en?"What is a savings pool?":"¿Qué es una tontina?",a:fr?"Un système où chaque membre cotise et reçoit à tour de rôle.":en?"Members contribute and take turns receiving the pot.":"Miembros contribuyen y reciben el total en turnos."},
    {q:fr?"KOB.SOL gère-t-il l'argent ?":en?"Does KOB.SOL handle money?":"¿KOB.SOL maneja dinero?",a:fr?"Non, c'est un outil de suivi uniquement.":en?"No, tracking only.":"No, solo seguimiento."},
    {q:fr?"Combien ça coûte ?":en?"How much does it cost?":"¿Cuánto cuesta?",a:fr?"Gratuit pour commencer.":en?"Free to start.":"Gratis para comenzar."},
  ];

  return(
    <div style={{fontFamily:"'Outfit',sans-serif"}}>
      <style>{CSS}</style>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Outfit:wght@300;400;600;700&display=swap');
        .lnd-wrap{min-height:100vh;background:#000;overflow-x:hidden;}
        .lnd-hero{position:relative;width:100vw;height:100vh;overflow:hidden;}
        .lnd-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transition:opacity .8s ease;}
        .lnd-overlay{position:absolute;inset:0;background:linear-gradient(to bottom,rgba(0,0,0,.25) 0%,rgba(0,0,0,.4) 50%,rgba(0,0,0,.8) 100%);}
        .lnd-nav{position:absolute;top:0;left:0;right:0;z-index:10;padding:24px 40px;display:flex;align-items:center;justify-content:space-between;}
        .lnd-logo{font-family:'Syne',sans-serif;font-weight:800;font-size:26px;color:#fff;letter-spacing:-1px;}
        .lnd-nav-r{display:flex;align-items:center;gap:12px;}
        .lnd-btn-ghost{background:transparent;border:1.5px solid rgba(255,255,255,.5);color:#fff;padding:9px 22px;border-radius:50px;font-family:'Outfit',sans-serif;font-size:13px;font-weight:600;cursor:pointer;transition:all .25s;}
        .lnd-btn-ghost:hover{background:rgba(255,255,255,.15);}
        .lnd-btn-green{background:#00E5A0;border:none;color:#000;padding:10px 24px;border-radius:50px;font-family:'Outfit',sans-serif;font-size:13px;font-weight:700;cursor:pointer;transition:all .25s;}
        .lnd-btn-green:hover{background:#00c48a;transform:translateY(-1px);}
        .lnd-center{position:absolute;inset:0;z-index:5;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:24px;}
        .lnd-eyebrow{font-size:11px;color:rgba(255,255,255,.7);letter-spacing:5px;text-transform:uppercase;margin-bottom:20px;}
        .lnd-title{font-family:'Syne',sans-serif;font-weight:800;font-size:clamp(44px,8vw,90px);color:#fff;line-height:1;letter-spacing:-3px;margin-bottom:20px;}
        .lnd-title span{color:#00E5A0;}
        .lnd-sub{font-size:clamp(15px,2vw,18px);color:rgba(255,255,255,.75);max-width:520px;line-height:1.75;margin-bottom:44px;font-weight:300;}
        .lnd-ctas{display:flex;gap:12px;align-items:center;justify-content:center;flex-wrap:wrap;margin-bottom:60px;}
        .lnd-cta-main{background:#00E5A0;border:none;color:#000;font-family:'Outfit',sans-serif;font-weight:700;font-size:16px;padding:17px 44px;border-radius:50px;cursor:pointer;transition:all .3s;}
        .lnd-cta-main:hover{background:#00c48a;transform:translateY(-2px);box-shadow:0 12px 40px rgba(0,229,160,.4);}
        .lnd-cta-sec{background:transparent;border:1.5px solid rgba(255,255,255,.5);color:#fff;font-family:'Outfit',sans-serif;font-size:15px;padding:15px 32px;border-radius:50px;cursor:pointer;transition:all .25s;}
        .lnd-cta-sec:hover{background:rgba(255,255,255,.1);}
        .lnd-stats{display:flex;gap:48px;justify-content:center;flex-wrap:wrap;}
        .lnd-stat-val{font-family:'Syne',sans-serif;font-weight:800;font-size:32px;color:#fff;}
        .lnd-stat-lbl{font-size:12px;color:rgba(255,255,255,.6);margin-top:3px;}
        .lnd-dots{position:absolute;bottom:32px;left:50%;transform:translateX(-50%);z-index:10;display:flex;gap:8px;}
        .lnd-dot{width:6px;height:6px;border-radius:50%;background:rgba(255,255,255,.4);border:none;cursor:pointer;padding:0;transition:all .3s;}
        .lnd-dot.on{background:#00E5A0;width:24px;border-radius:3px;}
        .lnd-lbl{position:absolute;bottom:72px;right:40px;z-index:10;font-size:11px;color:rgba(255,255,255,.5);letter-spacing:2px;text-transform:uppercase;}
        .lnd-body{background:#0a0f1e;padding:80px 24px;}
        .lnd-section{max-width:1000px;margin:0 auto 80px;}
        .lnd-s-eyebrow{font-size:11px;color:#00E5A0;letter-spacing:3px;text-transform:uppercase;margin-bottom:10px;}
        .lnd-s-title{font-family:'Syne',sans-serif;font-weight:800;font-size:clamp(28px,4vw,40px);color:#fff;margin-bottom:40px;}
        .lnd-feats{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px;}
        .lnd-feat{background:#0f1729;border:1px solid #1a2840;border-radius:20px;padding:28px;transition:all .25s;}
        .lnd-feat:hover{border-color:rgba(0,229,160,.3);transform:translateY(-3px);}
        .lnd-feat-icon{font-size:32px;margin-bottom:14px;}
        .lnd-feat-title{font-family:'Syne',sans-serif;font-weight:700;font-size:16px;color:#fff;margin-bottom:8px;}
        .lnd-feat-desc{font-size:13px;color:#5a6a88;line-height:1.7;}
        .lnd-faq-item{border-bottom:1px solid #1a2840;}
        .lnd-faq-q{width:100%;background:none;border:none;color:#e8edf5;font-family:'Outfit',sans-serif;font-size:15px;font-weight:600;padding:18px 0;text-align:left;cursor:pointer;display:flex;justify-content:space-between;gap:12px;}
        .lnd-faq-a{font-size:14px;color:#5a6a88;line-height:1.75;padding-bottom:16px;}
        .lnd-footer{background:#080d1a;text-align:center;padding:80px 24px;border-top:1px solid #1a2840;}
        .lnd-footer-title{font-family:'Syne',sans-serif;font-weight:800;font-size:clamp(28px,5vw,48px);color:#fff;margin-bottom:12px;}
        .lnd-footer-sub{font-size:16px;color:#5a6a88;margin-bottom:36px;}
       @media(max-width:600px){
  .lnd-nav{padding:12px 16px;flex-wrap:wrap;gap:8px;}
  .lnd-nav-r{gap:6px;}
  .lnd-btn-ghost{padding:7px 12px;font-size:11px;}
  .lnd-btn-green{padding:7px 14px;font-size:11px;}
  .lnd-stats{gap:24px;}
  .lnd-lbl{display:none;}
}
      `}</style>

      <div className="lnd-wrap">
        {/* HERO */}
        <div className="lnd-hero">
          <img className="lnd-img" src={images[currentImg].url} alt={images[currentImg].label} style={{opacity:fade?1:0}}/>
          <div className="lnd-overlay"/>
          <div className="lnd-nav">
            <div className="lnd-logo">KOB.SOL</div>
            <div className="lnd-nav-r">
              <LangSwitcher lang={lang} setLang={setLang}/>
              <ThemeToggle theme={theme} setTheme={setTheme}/>
              {onMyProjects&&<button className="lnd-btn-ghost" onClick={onMyProjects}>{fr?"Mes projets":en?"My projects":"Mis proyectos"}</button>}
              <button className="lnd-btn-green" onClick={onStart}>{fr?"Commencer":en?"Get started":"Comenzar"}</button>
            </div>
          </div>
          <div className="lnd-center">
            <div className="lnd-eyebrow">✦ {fr?"Épargne collective":en?"Group savings":"Ahorro colectivo"} ✦</div>
            <div className="lnd-title">
              {fr?<>Réalisez vos<br/><span>projets ensemble</span></>:en?<>Achieve your<br/><span>goals together</span></>:<>Logra tus<br/><span>metas juntos</span></>}
            </div>
            <div className="lnd-sub">{t.tagline}</div>
            <div className="lnd-ctas">
              <button className="lnd-cta-main" onClick={onStart}>{t.startBtn} →</button>
              {onDemo&&<button className="lnd-cta-sec" onClick={onDemo}>{fr?"Voir la démo":en?"See demo":"Ver demo"}</button>}
            </div>
            <div className="lnd-stats">
              <div><div className="lnd-stat-val">{fmtNum(count.users)}+</div><div className="lnd-stat-lbl">{fr?"Utilisateurs":en?"Users":"Usuarios"}</div></div>
              <div><div className="lnd-stat-val">{fmtNum(count.cycles)}+</div><div className="lnd-stat-lbl">{fr?"Cycles complétés":en?"Completed cycles":"Ciclos"}</div></div>
              <div><div className="lnd-stat-val">${fmtNum(count.amount)}+</div><div className="lnd-stat-lbl">{fr?"Distribués":en?"Distributed":"Distribuidos"}</div></div>
            </div>
          </div>
          <div className="lnd-lbl">{images[currentImg].label}</div>
          <div className="lnd-dots">
            {images.map((_,i)=><button key={i} className={"lnd-dot"+(currentImg===i?' on':'')} onClick={()=>{setFade(false);setTimeout(()=>{setCurrentImg(i);setFade(true);},300);}}/>)}
          </div>
        </div>

        {/* BODY */}
        <div className="lnd-body">
          <div className="lnd-section">
            <div className="lnd-s-eyebrow">{fr?"Fonctionnalités":en?"Features":"Características"}</div>
            <div className="lnd-s-title">{fr?"Tout ce dont vous avez besoin":en?"Everything you need":"Todo lo que necesitas"}</div>
            <div className="lnd-feats">
              {[
                {i:"🤝",t:fr?"Gestion de groupes":en?"Group management":"Grupos",d:fr?"Tontines, pools et cercles d'épargne.":en?"Tontines, pools and savings circles.":"Tontinas, pools y círculos."},
                {i:"📅",t:fr?"Cycles automatisés":en?"Automated cycles":"Ciclos automáticos",d:fr?"Calendriers générés automatiquement.":en?"Automatically generated schedules.":"Calendarios generados automáticamente."},
                {i:"⚠️",t:fr?"Suivi des retards":en?"Late payment tracking":"Seguimiento de atrasos",d:fr?"Signalez et résolvez les retards facilement.":en?"Flag and resolve late payments.":"Reporta y resuelve atrasos fácilmente."},
                {i:"🌍",t:fr?"195+ pays":en?"195+ countries":"195+ países",d:fr?"Sélecteur de pays pour les groupes diaspora.":en?"Country selector for diaspora groups.":"Selector para grupos diáspora."},
                {i:"🔒",t:fr?"100% privé":en?"100% private":"100% privado",d:fr?"Vos données restent privées.":en?"Your data stays private.":"Tus datos son privados."},
                {i:"📊",t:fr?"Statistiques":en?"Statistics":"Estadísticas",d:fr?"Vue globale de tous vos projets.":en?"Overview of all your projects.":"Vista global de todos tus proyectos."},
              ].map((f,i)=><div key={i} className="lnd-feat"><div className="lnd-feat-icon">{f.i}</div><div className="lnd-feat-title">{f.t}</div><div className="lnd-feat-desc">{f.d}</div></div>)}
            </div>
          </div>

          <div className="lnd-section" style={{maxWidth:720}}>
            <div className="lnd-s-eyebrow">FAQ</div>
            <div className="lnd-s-title">{fr?"Questions fréquentes":en?"Common questions":"Preguntas frecuentes"}</div>
            <div>
              {faqs.map((f,i)=>(
                <div key={i} className="lnd-faq-item">
                  <button className="lnd-faq-q" onClick={()=>setFaqOpen(faqOpen===i?null:i)}>
                    <span>{f.q}</span><span>{faqOpen===i?"▲":"▼"}</span>
                  </button>
                  {faqOpen===i&&<div className="lnd-faq-a">{f.a}</div>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FOOTER CTA */}
        <div className="lnd-footer">
          <div className="lnd-footer-title">{fr?"Prêt à commencer ?":en?"Ready to start?":"¿Listo para comenzar?"}</div>
          <div className="lnd-footer-sub">{fr?"Gratuit. Aucune carte bancaire requise.":en?"Free. No credit card required.":"Gratis. Sin tarjeta de crédito."}</div>
          <button className="lnd-cta-main" onClick={onStart}>{t.startBtn} →</button>
        </div>
      </div>
    </div>
  );
}
function InvitePanel({ team, t, user }) {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('member');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [invites, setInvites] = useState([]);

  useEffect(() => {
    loadInvites();
  }, [team.id]);

  async function loadInvites() {
    const { data } = await supabase
      .from('invitations')
      .select('*')
      .eq('project_id', team.id)
      .order('created_at', { ascending: false });
    if (data) setInvites(data);
  }

  function validate(e) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
  }

  async function handleSend() {
    if (!email.trim() || !validate(email.trim())) { setError(t.inviteError); return; }
    setLoading(true);
    const { data, error: fnError } = await supabase.functions.invoke('send-invitation', {
      body: {
        project_id: team.id,
        project_name: team.name,
        email: email.trim(),
        role,
        invited_by: user?.id,
      }
    });
    setLoading(false);
    if (fnError) { setError(fnError.message); return; }
    setEmail('');
    setError('');
    loadInvites();
  }

  async function handleRevoke(id) {
    await supabase.from('invitations').update({ status: 'revoked' }).eq('id', id);
    loadInvites();
  }

  return (
    <div>
      <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{t.inviteMembers}</div>
      <div style={{ fontSize: 13, color: '#5A6A88', marginBottom: 16 }}>{t.inviteMembersSub}</div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
        <input
          className="fi"
          style={{ marginBottom: 0, flex: 1 }}
          type="email"
          placeholder={t.inviteEmail}
          value={email}
          onChange={e => { setEmail(e.target.value); setError(''); }}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
        />
       
        <button className="btn btn-p btn-sm" onClick={handleSend} disabled={loading}>
          {loading ? '...' : t.inviteSend}
        </button>
      </div>
      {error && <div style={{ fontSize: 12, color: '#FF4D6D', marginBottom: 10 }}>⚠️ {error}</div>}
      <div style={{ marginTop: 20 }}>
        {invites.length === 0 ? (
          <div className="empty" style={{ padding: '24px 0' }}>
            <div className="ei">📧</div>
            <div className="es">{t.noInvites}</div>
          </div>
        ) : invites.map(inv => (
          <div key={inv.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', borderRadius: 10, border: '1px solid #1A2840', marginBottom: 8 }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 500 }}>{inv.email}</div>
              <div style={{ fontSize: 11, color: '#5A6A88', marginTop: 2 }}>
                {inv.role} · {inv.status} · {new Date(inv.created_at).toLocaleDateString()}
              </div>
            </div>
            {inv.status === 'pending' && (
              <button className="btn btn-d btn-xs" onClick={() => handleRevoke(inv.id)}>{t.inviteRevoke}</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
function InvitePage({token, onAuth, lang, setLang, theme, setTheme}) {
  const t = T[lang];
  const CSS = makeCSS(theme);
  const [invite, setInvite] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [mode, setMode] = useState('login');
  const [form, setFormState] = useState({name:'',email:'',password:''});
  const [authLoading, setAuthLoading] = useState(false);
  const [authErr, setAuthErr] = useState('');
  const set = (k,v) => setFormState(f=>({...f,[k]:v}));

  useEffect(()=>{
    async function loadInvite() {
      const {data, error} = await supabase
        .from('invitations')
        .select('*, projects(name)')
        .eq('token', token)
        .eq('status', 'pending')
        .single();
      if(error || !data) setError('Invitation invalide ou expirée.');
      else setInvite(data);
      setLoading(false);
    }
    if(token) loadInvite();
  },[token]);

  const handleAccept = async() => {
    if(!form.email || !form.password) return;
    setAuthLoading(true);
    try {
      let userId;
      if(mode==='register') {
        const {data, error} = await supabase.auth.signUp({
          email: form.email,
          password: form.password,
          options: {data: {name: form.name}}
        });
        if(error) {setAuthErr(error.message); setAuthLoading(false); return;}
        userId = data.user?.id;
      } else {
        const {data, error} = await supabase.auth.signInWithPassword({
          email: form.email,
          password: form.password
        });
        if(error) {setAuthErr(t.authErrInvalid); setAuthLoading(false); return;}
        userId = data.user?.id;
      }
      // Accepter l'invitation
      await supabase.from('invitations').update({status:'accepted'}).eq('token', token);
      // Ajouter accès au projet
      await supabase.from('project_access').insert({
        project_id: invite.project_id,
        user_id: userId,
        role: invite.role || 'member'
      });
      // Mettre à jour la politique SELECT pour inclure project_access
      const {data:{user:sbUser}} = await supabase.auth.getUser();
      onAuth({
        name: sbUser?.user_metadata?.name || form.email.split('@')[0],
        email: form.email
      });
      window.history.replaceState({}, '', '/');
    } catch(e) {
      setAuthErr(e.message);
    }
    setAuthLoading(false);
  };

  const C = getC(theme);

  if(loading) return (
    <div style={{minHeight:'100vh',background:C.bg,display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'Outfit,sans-serif'}}>
      <style>{CSS}</style>
      <div style={{color:C.textMuted}}>Chargement...</div>
    </div>
  );

  if(error) return (
    <div style={{minHeight:'100vh',background:C.bg,display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'Outfit,sans-serif',padding:24}}>
      <style>{CSS}</style>
      <div style={{textAlign:'center'}}>
        <div style={{fontSize:48,marginBottom:16}}>❌</div>
        <div style={{fontWeight:700,fontSize:20,marginBottom:8,color:C.text}}>{error}</div>
        <button className="btn btn-p" onClick={()=>{window.history.replaceState({},'',' /');window.location.reload();}}>Retour à l'accueil</button>
      </div>
    </div>
  );

  return (
    <div style={{minHeight:'100vh',background:C.bg,display:'flex',alignItems:'center',justifyContent:'center',padding:24,fontFamily:'Outfit,sans-serif',position:'relative',overflow:'hidden'}}>
      <style>{CSS}</style>
      <div style={{position:'absolute',inset:0,backgroundImage:"url('https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1600&q=80')",backgroundSize:'cover',backgroundPosition:'center',opacity:.15}}/>
      <div style={{position:'absolute',top:20,right:20,display:'flex',gap:8,zIndex:10}}>
        <LangSwitcher lang={lang} setLang={setLang}/>
        <ThemeToggle theme={theme} setTheme={setTheme}/>
      </div>
      <div style={{width:'100%',maxWidth:440,background:C.bgCard,border:'1px solid '+C.border,borderRadius:24,padding:40,position:'relative',zIndex:2}}>
        <div style={{textAlign:'center',marginBottom:28}}>
          <div style={{fontWeight:800,fontSize:28,background:'linear-gradient(135deg,#00E5A0,#F5C842)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',marginBottom:8}}>KOB.SOL</div>
          <div style={{fontSize:16,fontWeight:600,color:C.text,marginBottom:6}}>
            🤝 Tu es invité à rejoindre
          </div>
          <div style={{fontSize:22,fontWeight:800,color:C.accent,marginBottom:4}}>
            {invite?.projects?.name}
          </div>
          <div style={{fontSize:13,color:C.textMuted}}>
            Rôle : {invite?.role === 'viewer' ? 'Lecteur' : 'Membre'}
          </div>
        </div>

        <div className="auth-tabs" style={{marginBottom:20}}>
          <button className={"auth-tab"+(mode==='login'?' on':'')} onClick={()=>{setMode('login');setAuthErr('');}}>Connexion</button>
          <button className={"auth-tab"+(mode==='register'?' on':'')} onClick={()=>{setMode('register');setAuthErr('');}}>Créer un compte</button>
        </div>

        {authErr && <div className="auth-err">{authErr}</div>}

        {mode==='register' && (
          <div className="fg">
            <label className="fl">{t.authName}</label>
            <input className="fi" placeholder={t.authNamePh} value={form.name} onChange={e=>set('name',e.target.value)}/>
          </div>
        )}
        <div className="fg">
          <label className="fl">{t.authEmail}</label>
          <input className="fi" type="email" placeholder="email@exemple.com" value={form.email} onChange={e=>set('email',e.target.value)}/>
        </div>
        <div className="fg">
          <label className="fl">{t.authPassword}</label>
          <input className="fi" type="password" placeholder="••••••••" value={form.password} onChange={e=>set('password',e.target.value)} onKeyDown={e=>e.key==='Enter'&&handleAccept()}/>
        </div>

        <button className="btn btn-p" style={{width:'100%',justifyContent:'center'}} onClick={handleAccept} disabled={authLoading}>
          {authLoading ? 'Chargement...' : '✓ Accepter l\'invitation'}
        </button>
      </div>
    </div>
  );
}
function AppInner() {
  const initScreen = window.location.pathname.startsWith('/invite/') ? 'invite' : 'landing';
const inviteToken = window.location.pathname.startsWith('/invite/') ? window.location.pathname.split('/invite/')[1] : null;
const [screen,setScreen]=useState(initScreen);
  const [lang,setLang]=useState('fr');
  const [theme,setTheme]=useState('dark');
  const [page,setPage]=useState('teams');
  const [teams,setTeams]=useState([]);
  const [sel,setSel]=useState(null);
  const [showC,setShowC]=useState(false);
  const [toast,setToast]=useState(null);
  const [user,setUser]=useState(null);
  const [sessionLoading,setSessionLoading]=useState(true);
  const t=T[lang];
  const CSS=makeCSS(theme);
  useEffect(()=>{document.body.className=theme==='light'?'light':'';return()=>{document.body.className='';};},[theme]);

  // Restaurer la session au chargement
  useEffect(()=>{
    supabase.auth.getSession().then(({data:{session}})=>{
      if(session?.user){
        const u={id:session.user.id,name:session.user.user_metadata?.name||session.user.email.split('@')[0],email:session.user.email};
        setUser(u);
        setScreen('app');
      }
      setSessionLoading(false);
    });
    const {data:{subscription}}=supabase.auth.onAuthStateChange((_,session)=>{
      if(session?.user){
        setUser({id:session.user.id,name:session.user.user_metadata?.name||session.user.email.split('@')[0],email:session.user.email});
      } else {
        setUser(null);
      }
    });
    return ()=>subscription.unsubscribe();
  },[]);
  const handleAuth=async(u)=>{
    // Get full user from Supabase session
    const {data:{user:sbUser}}=await supabase.auth.getUser();
    setUser({...u,id:sbUser?.id});
    setScreen('app');
    setToast({msg:t.authGreeting+', '+u.name.split(' ')[0]+' !',type:''});
  };
  const handleDemo=()=>{setUser({name:'Utilisateur démo',email:'demo@kobsol.com'});setScreen('app');setToast({msg:'Mode démo activé',type:'warn'});};
  const handleSignOut=async()=>{await supabase.auth.signOut();setUser(null);setScreen('landing');setSel(null);setPage('teams');setTeams([]);};
 const loadProjects=async()=>{
    if(!user) return;
    const {data,error}=await supabase.from('projects').select(`
      *,
      project_members(*, late_payments(*))
    `)
    .or(`admin_id.eq.${user.id},id.in.(${await getAccessibleIds()})`)
    .order('created_at',{ascending:false});
    if(!error && data){
      const mapped=data.map(p=>({
        id:p.id,
        name:p.name,
        amountPerPerson:p.amount_per_person,
        period:p.period,
        startDate:p.start_date,
        endDate:p.end_date,
        country:p.country,
        createdAt:p.created_at,
        admin_id:p.admin_id,
        members:(p.project_members||[]).sort((a,b)=>a.order_index-b.order_index).map(m=>({
          id:m.id,name:m.name,email:m.email,order_index:m.order_index,
         lates:(m.late_payments||[]).map(l=>({
  id:l.id,memberId:m.id,since:l.since,dueDate:l.due_date,reason:l.reason,resolved:l.resolved,resolvedAt:l.resolved_at
}))
        })),
       lates:(p.project_members||[]).flatMap(m=>(m.late_payments||[]).filter(l=>!l.resolved).map(l=>({...l,memberId:m.id})))
      }));
      setTeams(mapped);
    }
  };

  const getAccessibleIds=async()=>{
    if(!user?.id) return '';
    const {data}=await supabase
      .from('project_access')
      .select('project_id')
      .eq('user_id',user.id);
    if(!data||data.length===0) return "''";
    return data.map(d=>`${d.project_id}`).join(',');
  };
  useEffect(()=>{if(user) loadProjects();},[user]);
  const create=async(team)=>{
    if(!user?.id){
      // Mode démo — stockage local uniquement
      const newTeam={id:genId(),...team,amountPerPerson:Number(team.amountPerPerson),members:team.members,lates:[],createdAt:new Date().toISOString()};
      setTeams(p=>[newTeam,...p]);
      setShowC(false);
      setToast({msg:t.projectCreated,type:''});
      return;
    }
    const {data:proj,error:projErr}=await supabase.from('projects').insert({
      name:team.name,
      amount_per_person:team.amountPerPerson,
      period:team.period,
      start_date:team.startDate,
      end_date:team.endDate||null,
      country:team.country||null,
      admin_id:user.id,
    }).select().single();
    if(projErr){setToast({msg:'Erreur: '+projErr.message,type:'danger'});return;}
    if(team.members?.length){
      const membersToInsert=team.members.map((m,i)=>({
        project_id:proj.id,name:m.name,email:m.email||null,order_index:i,status:'active'
      }));
      await supabase.from('project_members').insert(membersToInsert);
    }
    await loadProjects();
    setShowC(false);
    setToast({msg:t.projectCreated,type:''});
  };
 const update=async(upd,key='orderChanged')=>{
    if(key==='lateMarked'){
      const late=upd.lates[upd.lates.length-1];
      await supabase.from('late_payments').insert({
        project_id:upd.id,
        member_id:late.memberId,
        since:late.since,
        due_date:late.dueDate||null,
        reason:late.reason||''
      });
      await loadProjects();
    } else if(key==='lateResolved'){
      const resolvedLate=upd.lates.find(l=>l.resolved&&l.resolvedAt===new Date().toISOString().split('T')[0]);
      if(resolvedLate){
        await supabase.from('late_payments').update({resolved:true,resolved_at:new Date().toISOString()}).eq('id',resolvedLate.id);
      }
      await loadProjects();
    } else if(key==='orderChanged'){
      const updates=upd.members.map((m,i)=>({id:m.id,order_index:i,project_id:upd.id,name:m.name}));
      await supabase.from('project_members').upsert(updates);
      await loadProjects();
    } else if(key==='inviteSent'){
      setTeams(p=>p.map(x=>x.id===upd.id?upd:x));
      if(sel?.id===upd.id) setSel(upd);
      setToast({msg:t.inviteSent,type:''});
      return;
    } else {
      setTeams(p=>p.map(x=>x.id===upd.id?upd:x));
      if(sel?.id===upd.id) setSel(upd);
    }
    setToast({msg:key==='lateMarked'?t.lateMarked:key==='lateResolved'?t.lateResolved:t.orderChanged,type:key==='lateMarked'?'warn':''});
  };
if(screen==='invite') return <><style>{CSS}</style><InvitePage token={inviteToken} onAuth={handleAuth} onDemo={handleDemo} lang={lang} setLang={setLang} theme={theme} setTheme={setTheme}/></>;
  if(screen==='landing') return <><style>{CSS}</style><Landing onStart={()=>setScreen('auth')} onMyProjects={user?()=>setScreen('app'):null} lang={lang} setLang={setLang} theme={theme} setTheme={setTheme}/></>;
  if(screen==='auth') return <><style>{CSS}</style><AuthScreen onAuth={handleAuth} onDemo={handleDemo} lang={lang} setLang={setLang} theme={theme} setTheme={setTheme}/></>;
  return (
    <>
      <style>{CSS}</style>
      <nav className="app-nav">
        <div className="nav-logo" onClick={()=>{setScreen('landing');setSel(null);}}>KOB.SOL</div>
        <div className="nav-r">
          <div className="nav-tabs">
            <button className={'nav-tab'+(page==='teams'?' on':'')} onClick={()=>{setPage('teams');setSel(null);}}>{t.myTeams}</button>
            <button className={'nav-tab'+(page==='global'?' on':'')} onClick={()=>{setPage('global');setSel(null);}}>{t.globalView}</button>
          </div>
          <button className="btn btn-p btn-sm" onClick={()=>setShowC(true)}>{t.newProject}</button>
          {user&&<div className="auth-user-badge" onClick={()=>{setPage('profile');setSel(null);}}>
            <div className="auth-user-avatar">{user.name[0].toUpperCase()}</div>
            <div><div className="auth-user-name">{user.name}</div><div className="auth-user-email">{user.email}</div></div>
          </div>}
          <LangSwitcher lang={lang} setLang={setLang}/>
          <ThemeToggle theme={theme} setTheme={setTheme}/>
          {user&&<button className="btn btn-g btn-sm" onClick={handleSignOut}>{t.signOut}</button>}
        </div>
      </nav>
      <main className="app-main">
        {page==='profile'?(
          <ProfilePage user={user} setUser={setUser} onSignOut={handleSignOut} t={t} lang={lang} setLang={setLang} theme={theme} setTheme={setTheme}/>
        ):page==='global'?(
          <><div className="pt">{t.overview}</div><div className="ps">{t.overviewSub}</div><GlobalView teams={teams} t={t} lang={lang}/></>
        ):sel?(
         <TeamDetail team={sel} onBack={()=>setSel(null)} onUpdate={update} t={t} lang={lang} user={user}/>
        ):(
          <>
           <div style={{position:'fixed',inset:0,backgroundImage:"url('https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1600&q=80')",backgroundSize:'cover',backgroundPosition:'center',opacity:.25,zIndex:-1,pointerEvents:'none'}}/>
            <div className="ps">{teams.length} projet{teams.length!==1?'s':''}</div>
            {teams.length===0?(
              <div className="empty">
                <div className="ei">🤝</div><div className="et">{t.noProjects}</div>
                <div className="es">{t.noProjectsSub}</div>
                <button className="btn btn-p" onClick={()=>setShowC(true)}>{t.createFirst}</button>
              </div>
            ):(
              <div className="tg">{teams.map(tm=><TeamCard key={tm.id} team={tm} onClick={()=>setSel(tm)} t={t} lang={lang}/>)}</div>
            )}
          </>
        )}
      </main>
      {showC&&<CreateModal onClose={()=>setShowC(false)} onCreate={create} t={t} lang={lang}/>}
      {toast&&<Toast msg={toast.msg} type={toast.type} onDone={()=>setToast(null)}/>}
      {!sel&&<MobileNav page={page} setPage={setPage} setSel={setSel} onNew={()=>setShowC(true)} t={t} showFab={page!=='profile'}/>}
</>
  );
}

class ErrorBoundary extends React.Component {
  constructor(p){super(p);this.state={err:null};}
  static getDerivedStateFromError(e){return{err:e};}
  render(){
    if(this.state.err) return(
      <div style={{padding:32,fontFamily:'monospace',background:'#0F1729',color:'#FF4D6D',minHeight:'100vh',whiteSpace:'pre-wrap',fontSize:13}}>
        <div style={{fontSize:18,fontWeight:700,marginBottom:16}}>⚠️ Erreur Runtime KOBSOL</div>
        <div style={{color:'#E8EDF5',marginBottom:8}}>{this.state.err.message}</div>
        <div style={{color:'#5A6A88',fontSize:11}}>{this.state.err.stack}</div>
      </div>
    );
    return this.props.children;
  }
}
export default function App(){return <ErrorBoundary><AppInner/></ErrorBoundary>;}
